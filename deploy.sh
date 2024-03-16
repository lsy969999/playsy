# #!/bin/bash

# git pull

# IS_BLUE=$(docker ps | grep playsy_blue-nginx)
# IS_GREEN=$(docker ps | grep playsy_green-nginx)

# echo "IS_BLUE: $IS_BLUE"
# echo "IS_GREEN: $IS_GREEN"

# # BLUE 라인 넘버
# blue_line_number=3

# # GREEN 라인 넘버
# green_line_number=6

# # 파일 경로
# nginx_conf="/etc/nginx/conf.d/"

# target_path="/etc/nginx/conf.d/"
# from_path="/home/ubuntu/playsy/nginx/"

# # BLUE GREEN 둘다 없으면 BLUE 켜줌
# if [ -z "$IS_BLUE" ] && [ -z "$IS_GREEN" ]; then
#     echo "BLUE GREEN is not defined. Initializing deployment state..."
#     echo "Deploying BLUE..."

#     # BLUE 올린다.
#     docker-compose -f docker-compose-blue.yml up -d

#     # GREEN
#     # 주석 처리하기
#     # sed -i "" "${green_line_number}s/^\([^#]\)/# \1/" $nginx_conf

#     # BLUE
#     # 주석 해제하기
#     # sed -i "" "${blue_line_number}s/^# //" $nginx_conf

#     cp "${from_path}nginx.host.blue.conf" $target_path

# # DEPLOY_TARGET이 BLUE가 비어 있으면 BLUE를 배포한다.
# elif [ -z "$IS_BLUE" ]; then
#     echo "Deploying BLUE..."
#     # 여기에 BLUE를 배포하는 코드 추가

#     # BLUE 올린다.
#     docker-compose -f docker-compose-blue.yml up -d

#     # GREEN
#     # 주석 처리하기
#     # sed -i "" "${green_line_number}s/^\([^#]\)/# \1/" $nginx_conf

#     # BLUE
#     # 주석 해제하기
#     # sed -i "" "${blue_line_number}s/^# //" $nginx_conf

#     rm "${$target_path}nginx.host.green.conf"
#     cp "${from_path}nginx.host.blue.conf" $target_path

#     echo 'call: systemctl reload nginx && docker-compose -f docker-compose-green.yml down';

# # DEPLOY_TARGET이 GREEN 비어 있으면 BLUE를 배포한다.
# elif [ -z "$IS_GREEN" ]; then
#     echo "Deploying GREEN..."
#     # 여기에 GREEN을 배포하는 코드 추가

#     # GREEN 올린다.
#     docker-compose -f docker-compose-green.yml up -d

#     # BLUE
#     # 주석 처리하기
#     # sed -i "" "${blue_line_number}s/^\([^#]\)/# \1/" $nginx_conf

#     # GREEN
#     # 주석 해제하기
#     # sed -i "" "${green_line_number}s/^# //" $nginx_conf

#     rm "${$target_path}nginx.host.blue.conf"
#     cp "${from_path}nginx.host.green.conf" $target_path

#     echo 'call: systemctl reload nginx && docker-compose -f docker-compose-blue.yml down';
# else 
#     echo "BLUE GREEN BOTH RUNNING MUST DOWN ONE"
# fi
