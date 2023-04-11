from PIL import Image
import redis
from io import BytesIO


for i in range(1, 9):
    output = BytesIO()
    img = Image.open('../frontend/public/assets/emotes/emote' + str(i) + '.png')
    img.save(output, format=img.format)

    rds = redis.Redis(host='redis-14638.c281.us-east-1-2.ec2.cloud.redislabs.com', port=14638, db=0, password='r8OhsBMJgzVXrzCmEN1Uh1rc4Hhbg6lg')
    rds.set('emote' + str(i), output.getvalue())
    output.close()
    rds.save
