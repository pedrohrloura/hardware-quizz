# python3.6

import random
import psycopg2
import json
from paho.mqtt import client as mqtt_client






def postgres_connection():
    # Connection details
    hostname = 'postgres'
    database = 'postgres'
    username = 'postgres'
    password = 'pish1234'

    try:
        # Establish a connection
        connection = psycopg2.connect(
            host=hostname,
            database=database,
            user=username,
            password=password
        )

        # Create a cursor
        return connection

    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL:", error)



def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    # client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        global payload
        connection = postgres_connection()
        cursor = connection.cursor()
        data = json.loads(msg.payload.decode())
   
        if type(data) == list:
            for item in data:
                if payload['status'] == 'start':
                    item['id_quiz'] = payload['id_quiz']
                    item['id_pergunta'] = payload['id_pergunta'] 
                    columns = list(item.keys())
                    values = list(item.values())

                    # Construct the SQL query
                    insert_query = 'INSERT INTO "quizz-project".tentativas' + '({}) VALUES ({}) RETURNING id'.format(
                        ", ".join(columns),
                        ", ".join(['%s'] * len(columns))
                    )
                    
                    cursor.execute(insert_query, values)
                    print('executed')
            connection.commit()

            # Close the cursor and connection
            cursor.close()
            connection.close()
        elif type(data) == dict:
            payload = data
            print(payload)

    

    client.subscribe(topic)
    client.subscribe(topic_manager)
    client.on_message = on_message

    


def run():
    client = connect_mqtt()
    subscribe(client)
    client.loop_forever()


if __name__ == '__main__':
    broker = 'localhost'
    port = 1883
    topic = "quizz"
    topic_manager = 'quiz_manager'
    # Generate a Client ID with the subscribe prefix.
    client_id = f'subscribe-{random.randint(0, 100)}'
    # username = 'emqx'
    # password = 'public'
    payload = {}
    run()
