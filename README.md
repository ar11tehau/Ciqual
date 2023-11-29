# Food info

Retrieve nutriment information for a given id food from the ciqual data with Python and PostgreSQL

## Prerequisites

Run all this command from the root directory of your project

### Init a virtual environnement for python packages

If python virtual env isn't already install

```bash
sudo apt install python3.10-venv
```

then

```bash
python -m venv init_db/.venv
source init_db/.venv/bin/activate
```

### Install the required pip packages

* [Pip installation](https://pip.pypa.io/en/stable/installation/)

```bash
pip install -r init_db/requirements.txt
```

### Install and set PostgreSQL

* [PostgreSQL installation](https://www.postgresql.org/download/)

Login to the database local server as postgres user to create a new user

```bash
sudo -i -u postgres
```

Custom "newuser" and enter a "password" for "newuser", you'll need this password for the init_db/db_config.py 

```bash
createuser -P --createdb --createrole --superuser newuser
exit
```

Custom "mydatabase" and "myuser"

```bash
createdb -U myuser -h 'localhost' -p 5432 mydatabase
```

### Create the tables and fill them with data

Create the tables and fill the database from the raw xls file data from ciqual

The "in.xls" is required

```bash
python init_db/create_db_food.py
```

Update the "init_db/db_config.py"

### Install express and prisma client

* [Node_Source installation](https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions)

```bash
npm install express
npm install @prisma/client
```

### Initialize and set prisma

"npx prima init" will create the folder prisma and the file prisma.schema in it
It will also create ".env" file, change it to match the URL of your database.

```bash
npx prisma init
```

"npx prisma db pull" will create the schema database from "mydatabase"
"npx prisma generate" to initialize the prisma client

```bash
npx prisma db pull
npx prisma generate
```

"npx prisma studio" open a navigator window to check the database at localhost port 5555

```bash
npx prisma studio
```

"npx nodemon app.js" starts the javascript app at localhost port 3000
```bash
npx nodemon app.js
```