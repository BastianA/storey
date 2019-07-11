# security
A happy place for sharing awesome stuff!

___

### setup (macOS):
1. make sure you have **ruby** installed by running `$ ruby --version` in your terminal
2. install **[homebrew](https://brew.sh/)**, a package manager for macOS
  - paste the following line into your terminal and hit *Enter*
  ```bash
  $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  ```
3. install **[Xcode](https://itunes.apple.com/de/app/xcode/id497799835?mt=12)** developer tools via AppStore. You can also try to just download the command line tools from **[here](https://developer.apple.com/download/more/)**  
4. install **node js** via homebrew by running `$ brew install node`
  - this will also install **npm** the node package manager
  - verify both are installed correctly by typing `$ node -v` & `$ npm -v`
5. use **git** to clone this project to your local system
  - install git with homebrew `$ brew install git`
  - navigate to a desired directory (eg. /Users/bastian/Documents) with your terminal
  - run `$ git clone https://github.com/BastianA/security.git`
  - hop into your freshly created project via `$ cd security`
6. run `$ npm install` to install all dependencies
7. install angular cli globally `npm i -g @angular/cli@7.3.9`

#### help
If you keep getting errors on npm install, change owner of local node and project node_modules:
```
sudo chown -R <username> /usr/local/lib/node_modules/*
sudo chown -R <username> /Users/<username>/<path-to-project>/security/node_modules/*
```

### run the app
- run `$ ng serve` to start a local web server on [localhost:4200](http://localhost:4200/)
