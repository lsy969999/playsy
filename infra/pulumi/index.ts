import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// stack에서 데이터 가져오지만, default 사용
const config = new pulumi.Config();
const instanceType = config.get("instanceType") || "t3.medium";
const vpcNetworkCidr = config.get("vpcNetworkCidr") || "10.0.0.0/16";
const domainName = config.get("domainName") || "playsy.xyz"

// 우분투 22.04 amd64 사용
const ubuntu = aws.ec2.getAmi({
  mostRecent: true,
  filters: [
      {
          name: "name",
          values: ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"],
      },
      {
          name: "virtualization-type",
          values: ["hvm"],
      },
  ],
  owners: ["099720109477"],
}).then(invoke => invoke.id);;

// VPC 생성
const vpc = new aws.ec2.Vpc("vpc", {
  cidrBlock: vpcNetworkCidr,
  enableDnsHostnames: true,
  enableDnsSupport: true,
});

// internet gateway. 생성
const gateway = new aws.ec2.InternetGateway("gateway", {vpcId: vpc.id});

// 새 인스턴스에 퍼블릭 IP 주소를 자동으로 할당하는 서브넷을 생성
const subnet = new aws.ec2.Subnet("subnet", {
  vpcId: vpc.id,
  cidrBlock: "10.0.1.0/24",
  mapPublicIpOnLaunch: true,
});

// 라우팅 테이블 생성
const routeTable = new aws.ec2.RouteTable("routeTable", {
  vpcId: vpc.id,
  routes: [{
      cidrBlock: "0.0.0.0/0",
      gatewayId: gateway.id,
  }],
});

// 라우팅 테이블을 퍼블릭 서브넷과 연결합니다.
const routeTableAssociation = new aws.ec2.RouteTableAssociation("routeTableAssociation", {
  subnetId: subnet.id,
  routeTableId: routeTable.id,
});

// 80포트 허용 및 22 포트 내 ip 만 허용하는 보안 그룹 생성
const secGroup = new aws.ec2.SecurityGroup("secGroup", {
  description: "Enable HTTP access",
  vpcId: vpc.id,
  ingress: [
    {
      fromPort: 80,
      toPort: 80,
      protocol: "tcp",
      cidrBlocks: ["0.0.0.0/0"],
    },
    {
      fromPort: 443,
      toPort: 443,
      protocol: "tcp",
      cidrBlocks: ["0.0.0.0/0"],
    },
    {
      fromPort: 22,
      toPort: 22,
      protocol: "tcp",
      cidrBlocks: ["39.115.9.165/32"],
    }
  ],
  egress: [{
      fromPort: 0,
      toPort: 0,
      protocol: "-1",
      cidrBlocks: ["0.0.0.0/0"],
  }],
});

// ec2 초기화
const userData = `#!/bin/bash
echo "Hello, World from Pulumi!" > Hello.txt

apt update

# 도커 설치
apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" -y
apt-get update
apt-get install docker-ce docker-ce-cli containerd.io -y

# 도커컴포즈 설치
apt-get install jq -y
VERSION=$(curl --silent https://api.github.com/repos/docker/compose/releases/latest | jq .name -r)
DESTINATION=/usr/bin/docker-compose
curl -L https://github.com/docker/compose/releases/download/$VERSION/docker-compose-$(uname -s)-$(uname -m) -o $DESTINATION
chmod 755 $DESTINATION

# nginx 설치
apt-get install nginx

# npm 설치
apt-get install npm -y

# timezone 변경 to kst
rm /etc/localtime
ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime
`;

// 키페어 생성
const keyPair = new aws.ec2.KeyPair("id_rsa", {
  publicKey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDAyt1DOExy7EdIqNGF5PBz7tPZFkVHwN/R/7U3+PCc8Rdb9oGnGmuSufwswycogB5ktDsbInil3DgHHWyZrLL+71bQCZivyRpHS+N2wFOtykhH5fgKzbu+51lsdK8dDPUTsquCc5awgGQjuAsiX5ZrUH55j6VQ6yZVa+jRVOOnpNPkgWcLmCB5gC2beDbj1DCn/O/vKPDoC7B32/sjQhRYitYzaqYDhq42iVbISCSrOGSlAGMor4Lvpbsyf7yNFaHVoxKNqLa/dCYuk5G7kRG8spkZOY+XNuP2YWj26/lDxWrdQxJVJV5X3/dKvugKwFZ18IxpA8qG5VVE+4x6jh7qXc5nQiDJ2hhNMzQudgm/hHb5ujmZc3Sf6rgE3poySvRolfMR8fh12aa+aGd4X5yfp+UHY7RrnTj+XxiYqwKHzLHLkUaAL4whfhpxG1bC5X6Uefp0pBM+/Pti4CPn3pU94s7QgfHbMJ19WBamY3Sq2FcoD0LJFzxbq5om84RRI9c= syl@SYui-MacBookPro.local", // Replace this with your actual SSH public key
});

// 위 설정과 함께 ec2 인스턴스 생성 
const server = new aws.ec2.Instance("playsy", {
  instanceType: instanceType,
  subnetId: subnet.id,
  vpcSecurityGroupIds: [secGroup.id],
  ami: ubuntu,
  userData: userData,
  keyName: keyPair.keyName,
  tags: {
      Name: "playsy",
  },
});

// 엘라스틱 아이피 할당
let webEip = new aws.ec2.Eip("playsy-eip", {
  instance: server.id,
  vpc: true,
})

// route 53
const hostedZone = new aws.route53.Zone("playsy-hosted-zone", {
  name: domainName
})

// route 53
const aRecord = new aws.route53.Record("my-a-record", {
  zoneId: hostedZone.zoneId,
  name: domainName,
  type: "A",
  ttl: 300,
  records: [ webEip.publicIp ]
})

// route 53
const apiRecord = new aws.route53.Record("my-api-record", {
  zoneId: hostedZone.zoneId,
  name: `api.${domainName}`,
  type: "A",
  ttl: 300,
  records: [ webEip.publicIp ]
})


// 변수 export
export const keyPairName = keyPair.keyName;
export const keyPairId = keyPair.id;
export const ip = server.publicIp;
export const hostname = server.publicDns;
export const url = pulumi.interpolate`http://${server.publicDns}`;
export const eip_address = webEip.publicIp;
export const serverUrn = server.urn;
