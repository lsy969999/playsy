```bash
# pulumi 프로젝트 생성
pulumi new aws-typescript

# pulumi export 한 var 확인
pulumi stack output $var

# pulumi 리소스 전체 적용 및 해제
pulumi up
pulumi destroy

# pulumi 리소스 일부분 적용 및 해제
pulumi up --target urn:pulumi:dev::playsy::aws:ec2/instance:Instance::playsy
pulumi destroy --target urn:pulumi:dev::playsy::aws:ec2/instance:Instance::playsy

# target template
pulumi up --target urn:pulumi:stackname::projectname::resourcetype:resource$resource

# ssh template
ssh -i "id_rsa" ubuntu@ec2-15-164-173-182.ap-northeast-2.compute.amazonaws.com
```


```bash
# ubuntu docker install
sudo apt update

sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common -y

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" -y

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io -y
```

```bash
# test nginx run
sudo docker run -d --name webserver -p 80:80 nginx:latest
```


ec2 한부분만 destroy 할려하면 종속된 리소스 전부 destroy 해주어야 되는듯
ec2 요금이 걱정되면 수동으로 콘솔들어가서 stop 처리 해주어야 할듯
전체 destroy 하면 eip 나 route53 같은게 전부 초기화 된다.