cd $1
mvn -e clean apigee-enterprise:deploy -P $2 -Dusername=psubrahmanyam@apigee.com -Dpassword=$3
cd ..