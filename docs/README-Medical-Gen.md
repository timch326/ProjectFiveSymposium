# Setup Guide for Discourse - medical genetics
This guide is based on "Discourse Advanced Developer Install Guide" and several other discourse guides. You may choose to use those guides as most steps will be the same. 

This guide will be aimed to ubuntu 14.04.

### Development Server
## First Steps
If you are in root, create a normal user, login, and check the following requirements:

1. Install and configure PostgreSQL 9.3+.
  1. Run `postgres -V` or `psql -V`to see if you already have it.
  1. You can install it using sudo apt-get install postgresql postgresql-contrib
  1. Make sure that the server's messages language is English; this is [required](https://github.com/rails/rails/blob/3006c59bc7a50c925f6b744447f1d94533a64241/activerecord/lib/active_record/connection_adapters/postgresql_adapter.rb#L1140) by the ActiveRecord Postgres adapter.
2. Install and configure Redis 2+.
  1. Run `redis-server -v` to see if you already have it.
  1. If not, sudo apt-get install redis-server
3. Install ImageMagick, libxml2, libpq-dev, g++, and make.
	1. sudo apt-get install ImageMagick libxml2 libpq-dev g++ make
5. Install Ruby 2.1.3 and Bundler.
	1. Use RVM and make sure you run it as a normal user, not root.
	1. https://rvm.io/rvm/install
	1. First run the gpg command to get the public key. For example: gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
	1. Then run \curl -sSL https://get.rvm.io | bash -s stable --ruby
	1. You may need to run: source /home/youruser/.rvm/scripts/rvm
	1. Check that you have ruby install with atleast 2.1.3 with `rvm list`
	1. Then install bundler: `gem install bundle`
	1. Note: You may need to restart if you can't run ruby commands but have installed it already.
6. Clone the git project.
	1. Install git by sudo apt-get install git.

## Before you start Rails

1. First cd into the git project.
2. Run `bundle install`
3. Start up Redis by running `redis-server`
4. If your user does not have a postgres user role yet. You must create one.
	1. When you installed postgres, there should be a default postgres user. login as postgres: `sudo -i -u postgres`
	1. Run: `createuser --interactive` and follow the prompts. You will need to create a user with the same name as your normal login.
	1. After creating the user for postgres, return back to your normal user. `exit` 
5. `bundle exec rake db:create db:migrate db:test:prepare`
	1. you can run each db individually as well. `bundle exec rake db:create`, `bundle exec rake db:migrate `
6. [optional] Try running the specs: `bundle exec rake autospec`
7. `bundle exec rails server`

You should now be able to connect to rails on [http://localhost:3000](http://localhost:3000) - try it out! The seed data includes a pinned topic that explains how to get an admin account, so start there! Happy hacking!


## Creating an admin account
If you would like to use the default admin account you can use the following url. Note that this only work for development environments.
http://localhost:3000/session/system/become

To create your own admin account go to the site and sign up for an account. 
# In the terminal, change directory to the git project and run the following commands:

`bundle exec rails c`

Then in the rails console: 
 
# Administratorize yourself:
> me = User.find_by_username_or_email('myemailaddress@me.com')
> me.activate # use this in case you haven't configured your mail server and therefore can't receive the activation mail.
> me.admin = true
> me.user_role = "super_admin"
> me.save

# Mark yourself as the 'system user':
# (in rails console)
> SiteSetting.site_contact_username = me.username

To leave the rails console type `quit`.


# Building your own Vagrant VM

Here are the steps we used to create the **[Vagrant Virtual Machine](VAGRANT.md)**. They might be useful if you plan on setting up an environment from scratch on Linux:


## Base box

Vagrant version 1.1.2. With this Vagrantfile:

    Vagrant::Config.run do |config|
      config.vm.box     = 'precise32'
      config.vm.box_url = 'http://files.vagrantup.com/precise32.box'
      config.vm.network :hostonly, '192.168.10.200'

      if RUBY_PLATFORM =~ /darwin/
        config.vm.share_folder("v-root", "/vagrant", ".", :nfs => true)
      end
    end

    vagrant up
    vagrant ssh

## Some basic setup:

    sudo su -
    ln -sf /usr/share/zoneinfo/Canada/Eastern /etc/localtime
    apt-get -yqq update
    apt-get -yqq install python-software-properties
    apt-get -yqq install vim curl expect debconf-utils git-core build-essential zlib1g-dev libssl-dev openssl libcurl4-openssl-dev libreadline6-dev libpcre3 libpcre3-dev imagemagick

## Unicode

    echo "export LANGUAGE=en_US.UTF-8" >> /etc/bash.bashrc
    echo "export LANG=en_US.UTF-8" >> /etc/bash.bashrc
    echo "export LC_ALL=en_US.UTF-8" >> /etc/bash.bashrc
    export LANGUAGE=en_US.UTF-8
    export LANG=en_US.UTF-8
    export LC_ALL=en_US.UTF-8

    locale-gen en_US.UTF-8
    dpkg-reconfigure locales

## RVM and Ruby

    apt-get -yqq install libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt-dev autoconf libc6-dev ncurses-dev automake libtool bison subversion pkg-config curl build-essential git

    su - vagrant -c "sudo bash -s stable < <(curl -s https://raw.github.com/wayneeseguin/rvm/master/binscripts/rvm-installer)"
    adduser vagrant rvm
    source /etc/profile.d/rvm.sh
    su - vagrant -c "rvm pkg install libyaml"
    su - vagrant -c "rvm install 2.0.0-turbo"
    su - vagrant -c "rvm use 2.0.0-turbo --default"

    echo "gem: --no-document" >> /etc/gemrc
    su - vagrant -c "echo 'gem: --no-document' >> ~/.gemrc"

## Postgres

Configure so that the vagrant user doesn't need to provide username and password.

    apt-get -yqq install postgresql postgresql-contrib-9.3 libpq-dev postgresql-server-dev-9.3
    su - postgres
    createuser --createdb --superuser -Upostgres vagrant
    psql -c "ALTER USER vagrant WITH PASSWORD 'password';"
    psql -c "create database discourse_development owner vagrant encoding 'UTF8' TEMPLATE template0;"
    psql -c "create database discourse_test        owner vagrant encoding 'UTF8' TEMPLATE template0;"
    psql -d discourse_development -c "CREATE EXTENSION hstore;"
    psql -d discourse_development -c "CREATE EXTENSION pg_trgm;"


Edit /etc/postgresql/9.3/main/pg_hba.conf to have this:

    local all all trust
    host all all 127.0.0.1/32 trust
    host all all ::1/128 trust
    host all all 0.0.0.0/0 trust # wide-open

## Redis

    sudo su -
    mkdir /tmp/redis_install
    cd /tmp/redis_install
    wget http://redis.googlecode.com/files/redis-2.6.7.tar.gz
    tar xvf redis-2.6.7.tar.gz
    cd redis-2.6.7
    make
    make install
    cd utils
    ./install_server.sh
    # Press enter to accept all the defaults
    /etc/init.d/redis_6379 start

## Sending email (SMTP)

By default, development.rb will attempt to connect locally to send email.

```rb
config.action_mailer.smtp_settings = { address: "localhost", port: 1025 }
```

Set up [MailCatcher](https://github.com/sj26/mailcatcher) so the app can intercept
outbound email and you can verify what is being sent.

Note also that mail is sent asynchronously by Sidekiq, so you'll need to have it running to process jobs. Run it with this command:

```
bundle exec sidekiq
```

## Phantomjs

Needed to run javascript tests.

    cd /usr/local/share
    wget https://phantomjs.googlecode.com/files/phantomjs-1.8.2-linux-i686.tar.bz2
    tar xvf phantomjs-1.8.2-linux-i686.tar.bz2
    rm phantomjs-1.8.2-linux-i686.tar.bz2
    ln -s /usr/local/share/phantomjs-1.8.2-linux-i686/bin/phantomjs /usr/local/bin/phantomjs

	
	
## Setting up a production server
This guide is based on the Discourse Ubuntu Install Guide	

It is recommended to also create a 'discourse' user along side with your normal user.

First install the following:

>     # Run these commands as your normal login (e.g. "michael")
>     sudo apt-get update && sudo apt-get -y upgrade
>     sudo apt-get install tasksel
>     sudo tasksel install openssh-server
>     sudo tasksel install mail-server
>     sudo tasksel install postgresql-server

If you have ran sudo apt-get install postgresql postgresql-contrib, you should already have the postgres server


When you run the command to install the mail-server you will be prompted to configure the server initially. The guide suggests to create a satellite system.

> ### Configure the mail server:

> ![screenshot of mail server type configuration screen](https://raw.github.com/discourse/discourse-docimages/master/install/ubuntu%20-%20install%20-%20mail_1%20system%20type.png)

> In our example setup, we're going to configure as a 'Satellite system', forwarding all mail to our egress servers for delivery. You'll probably want to do that unless you're handling mail on the same machine as the Discourse software.

> ![screenshot of mail name configuration screen](https://raw.github.com/discourse/discourse-docimages/master/install/ubuntu%20-%20install%20-%20mail_2%20mailname.png)

> You probably want to configure your 'mail name' to be the base name of your domain. Note that this does not affect any email sent out by Discourse itself, just unqualified mail generated by systems programs.

> ![screenshot of relay host configuration screen](https://raw.github.com/discourse/discourse-docimages/master/install/ubuntu%20-%20install%20-%20mail_3%20relayconfig.png)

> If you have a mail server responsible for handling the egress of email from your network, enter it here. Otherwise, leave it blank.

Then install the following packages incase it is not already.

> Install necessary packages:

>     # Run these commands as your normal login (e.g. "michael")
>     sudo apt-get -y install build-essential libssl-dev libyaml-dev git libtool libxslt-dev libxml2-dev libpq-dev gawk curl pngcrush imagemagick python-software-properties

>     # If you're on Ubuntu >= 12.10, change:
>     # python-software-properties to software-properties-common


> ## Caching: Redis

> Redis is a networked, in memory key-value store cache. Without the Redis caching layer, we'd have to go to the database a lot more often for common information and the site would be slower as a result.

> Be sure to install the latest stable Redis, as the package in the distro may be a bit old:

>     sudo apt-add-repository -y ppa:rwky/redis
>     sudo apt-get update
>     sudo apt-get install redis-server

> ## Web Server: nginx

> nginx is used for:

> * reverse proxy (i.e. load balancer)
> * static asset serving (since you don't want to do that from ruby)
> * anonymous user cache

> At Discourse, we recommend the latest version of nginx (we like the new and
> shiny). To install on Ubuntu:

>     # Run these commands as your normal login (e.g. "michael")
>     # Remove any existing versions of nginx
>     sudo apt-get remove '^nginx.*$'

>     # Setup a sources.list.d file for the nginx repository
>     cat << 'EOF' | sudo tee /etc/apt/sources.list.d/nginx.list
>     deb http://nginx.org/packages/ubuntu/ precise nginx
>     deb-src http://nginx.org/packages/ubuntu/ precise nginx
>     EOF

>     # Add nginx key
>     curl http://nginx.org/keys/nginx_signing.key | sudo apt-key add -

>     # install nginx
>     sudo apt-get update && sudo apt-get -y install nginx


Now we need to create a discourse user

> Create Discourse user:

>     # Run these commands as your normal login (e.g. "michael")
>     sudo adduser --shell /bin/bash --gecos 'Discourse application' discourse
>     sudo install -d -m 755 -o discourse -g discourse /var/www/discourse

> Give Postgres database rights to the `discourse` user:

>     # Run these commands as your normal login (e.g. "michael")
>     sudo -u postgres createuser -s discourse
>     # If you will be using password authentication on your database, only
>     # necessary if the database will be on a remote host
>     sudo -u postgres psql -c "alter user discourse password 'todayisagooddaytovi';"

> Change to the 'discourse' user:

>     # Run this command as your normal login (e.g. "michael"), further commands should be run as 'discourse'
>     sudo su - discourse

> Install RVM

	1. Use RVM and make sure you run it as a normal user, not root.
	1. https://rvm.io/rvm/install
	1. First run the gpg command to get the public key. For example: gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
	1. Then run \curl -sSL https://get.rvm.io | bash -s stable --ruby
	1. You may need to run: source /home/youruser/.rvm/scripts/rvm
	1. Check that you have ruby install with atleast 2.1.3 with `rvm list`
	1. Then install bundler: `gem install bundle`

> Install missing packages

>     # Install necessary packages for building ruby (this will only work if
>     # you've given discourse sudo permissions, which is *not* the default)
>     # rvm requirements

>     # NOTE: rvm will tell you which packages you (or your sysadmin) need
>     # to install during this step. As discourse does not have sudo
>     # permissions (likely the case), run:

>     rvm --autolibs=read-fail requirements

>     # For instance, if prompted with `libreadline6-dev libsqlite3-dev sqlite3 autoconf' etc
>     # Install the missing packages with this command, run as your user:
>     # sudo apt-get install libreadline6-dev libsqlite3-dev sqlite3 autoconf libgdbm-dev libncurses5-dev bison libffi-dev
>     # Repeat the autolibs test until you see "Requirements installation successful"




Now get the source code

# Pull down the latest code
# Now would be a great time to consider [forking](https://help.github.com/articles/fork-a-repo), if want to work from your own copy of discourse
#If you don't need to customize your installation, and want less hassle upgrading clone from Discourse's repo
#Here you would replace with your sources if you want to use your development code.

git clone git://github.com/discourse/discourse.git /var/www/discourse
cd /var/www/discourse

# To run on the most recent numbered release instead of bleeding-edge:
#git checkout latest-release

# Install necessary gems
bundle install --deployment --without test


> Configure Discourse:

>     # Run these commands as the discourse user
>     cd /var/www/discourse/config
>     cp discourse_default.conf discourse.conf
>     cp discourse.pill.sample discourse.pill


> Editing /var/www/discourse/config/discourse.conf:
> Note that this file is where all the configurations are stored for production. There is no production settings in the database.yml.

> Database/Hostname:
> - change database username/password if appropriate
> - change `hostname` to the name you'll use to access the Discourse site, e.g. "forum.example.com"

> Redis:
> - no changes if this is the only application using redis, but have a look

> E-mail:
> - browse through all the settings and be sure to add your mail server SMTP settings so outgoing mail can be sent (we recommend [Mandrill](https://mandrillapp.com))
> - If your users will come from "internal" [private unroutable IPs](https://en.wikipedia.org/wiki/Private_network) like 10.x.x.x or 192.168.x.x please [see this topic](http://meta.discourse.org/t/all-of-my-internal-users-show-as-coming-from-127-0-0-1/6607).

> Editing: /var/www/discourse/config/discourse.pill
> - change application name from 'discourse' if necessary
> - Ensure appropriate Bluepill.application line is uncommented
> - Here if there are any problems you can turn on debug mode

### Creating the production database
First make sure that there is a user role for the discourse user in your postgres server.
	1. When you installed postgres, there should be a default postgres user. login as postgres: `sudo -i -u postgres`
	1. Run: `createuser --interactive` and follow the prompts. 
	
After that go back to the discourse user and:
cd /var/www/discourse
RAILS_ENV=production bundle exec rake db:create
RAILS_ENV=production bundle exec rake db:migrate
RAILS_ENV=production bundle exec rake assets:precompile

	
> ## nginx setup

>     # Run these commands as your normal login (e.g. "michael")
>     sudo cp /var/www/discourse/config/nginx.global.conf /etc/nginx/conf.d/local-server.conf
>     sudo cp /var/www/discourse/config/nginx.sample.conf /etc/nginx/conf.d/discourse.conf

> If Discourse will be the only site served by nginx, disable the nginx default
> site:

> - `sudo mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.disabled`
> - Otherwise, only `server_name`s configured below in `discourse.conf` will be passed to Discourse.

> Edit /etc/nginx/conf.d/discourse.conf

> - edit `server_name`. Example: `server_name cain.discourse.org test.cain.discourse.org;`
> - change socket count depending on your NUM_WEB count
> - change socket paths if Discourse is installed to a different location
> - modify root location if Discourse is installed to a different location

> Reload nginx by running

>     # Run as your normal login (e.g. "michael")
>     sudo /etc/init.d/nginx reload



> ## Bluepill setup

> Configure Bluepill:

>     # Run these commands as the discourse user
>     gem install bluepill
>     echo 'alias bluepill="NOEXEC_DISABLE=1 bluepill --no-privileged -c ~/.bluepill"' >> ~/.bash_aliases
>     rvm wrapper $(rvm current) bootup bluepill
>     rvm wrapper $(rvm current) bootup bundle

> Start Discourse:

>     # Run these commands as the discourse user
>     RUBY_GC_MALLOC_LIMIT=90000000 RAILS_ROOT=/var/www/discourse RAILS_ENV=production NUM_WEBS=2 bluepill --no-privileged -c ~/.bluepill load /var/www/discourse/config/discourse.pill

> Add the Bluepill startup to crontab.

>     # Run these commands as the discourse user
>     crontab -e

> Add the following lines:

>     @reboot RUBY_GC_MALLOC_LIMIT=90000000 RAILS_ROOT=/var/www/discourse RAILS_ENV=production NUM_WEBS=2 /home/discourse/.rvm/bin/bootup_bluepill --no-privileged -c ~/.bluepill load /var/www/discourse/config/discourse.pill

I recommend setting bluepill to run in debug mode first to make sure to works. Also you should only add it to the crontab after you know it works. You can turn on debug mode in the .pill file in the discourse config folder.
You can stop bluepill with 
>     bluepill stop
>     bluepill quit



### Testing the site
to see the site, try going to localhost (80)
to test to make sure the site is in production mode
try accessing /session/system/become
you should get forbidden as this command is only available in development mode.




Some possible issue that you might face when trying to run the production server:
When you are running blue pill, you might get a message saying that it can not connect to the database. This might be because that by default postgres requires other processes to interactive with the database with authenication only. If you set up a password this will go away. If you are doing this without a password you can allow local connection to connect. This can be done by editing the pg_hba.conf file.

Allowing local connections -- http://suite.opengeo.org/4.1/dataadmin/pgGettingStarted/firstconnect.html
The file pg_hba.conf governs the basic constraints underlying connection to PostgreSQL. By default, these settings are very conservative. Specifically, local connections are not allowed for the postgres user.

To allow this:

As a super user, open /etc/postgresql/9.3/main/pg_hba.conf (Ubuntu) or /var/lib/pgsql/9.3/data/pg_hba.conf (Red Hat) in a text editor.
Scroll down to the line that describes local network. It may look like this:

# IPv4 local connections:
host    all             all             127.0.0.1/32            ident
# IPv6 local connections:
host    all             all             ::1/128                 ident
Change the ident method to trust.

Note
For more information on the various options, please see the PostgreSQL documentation on pg_hba.conf.

Warning
Using trust allows the all local users to connect to the database without a password. This is convenience, but insecure. If you want a little more security, replace trust with md5, and use the password you set in the previous section to connect.

Now.
Save and close the file.
Restart PostgreSQL:
sudo service postgresql restart



Sometimes even after the server is running smoothly you can't connect to the correct site as localhost:80 brings you to a nginx default landing page. Try to press refresh on the browser. Sometimes after doing the nginx set up steps the reload/restart doesnt work. So what you can do is stop the server and start it again. This should refresh the page.

Sometimes after stopping and starting the server you get issues trying to start the server. When you start the nginx server it might complain that there is no file:  ‘/var/nginx/cache’: No such file or directory.
You can fix this by creating the /var/nginx  folder for yourself:


> ## Updating Discourse

>     # Run these commands as the discourse user
>     bluepill stop
>     bluepill quit
>     # Back up your install
>     DATESTAMP=$(TZ=UTC date +%F-%T)
>     pg_dump --no-owner --clean discourse_prod | gzip -c > ~/discourse-db-$DATESTAMP.sql.gz
>     tar cfz ~/discourse-dir-$DATESTAMP.tar.gz -C /var/www discourse
>     # get the latest Discourse code
>     cd /var/www/discourse
>     git checkout master
>     git pull
>     git fetch --tags
>     # To run on the latest numbered release instead of bleeding-edge:
>     #git checkout latest-release
>     #
>     # Follow the section below titled:
>     # "Check sample configuration files for new settings"
>     #
>     bundle install --without test --deployment
>     RUBY_GC_MALLOC_LIMIT=90000000 RAILS_ENV=production bundle exec rake db:migrate
>     RUBY_GC_MALLOC_LIMIT=90000000 RAILS_ENV=production bundle exec rake assets:precompile
>     # restart bluepill
>     crontab -l
>     # Here, run the command to start bluepill.
>     # Get it from the crontab output above.



If you run any problems that this guide does not cover, please check the discourse readme that are in this project. You can also check the logs in the log folder.


