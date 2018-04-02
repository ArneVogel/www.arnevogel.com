import requests, json, csv, time

url = "https://wifi-bahn.de/schedule.jason"

while True:
	r = requests.get(url)
	if r.status_code is 200:
		jdata = json.loads(r.text)
		data = []
		data.append(jdata["lat"])
		data.append(jdata["lng"])
		data.append(jdata["speed"])
		data.append(jdata["timestamp"])
		print(jdata["speed"])
		with open('bahn.csv', 'a', newline='') as f:
			writer = csv.writer(f)
			writer.writerow(data)
	time.sleep(5)