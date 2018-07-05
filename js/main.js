function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const paidEmailProviderList = [
  "ucop.com",
  "ups.com",
  "aws.com",
  "apple.com",
  "amazon.com"
];

const freeEmailProviderList = [
  "gmail.com",
  "hotmail.com",
  "zoho.com",
  "outlook.com",
];

const countryList = [
  "África do Sul",
  "Albânia",
  "Alemanha",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua",
  "Arábia Saudita",
  "Argentina",
  "Armênia",
  "Aruba",
  "Austrália",
  "Áustria",
  "Bélgica",
  "Brasil",
  "Chile",
  "China",
  "Cidade do Vaticano",
  "Coréia do Sul",
  "EUA",
  "Egito",
  "Emirados Árabes",
  "Equador",
  "Espanha",
  "Haiti",
  "Holanda",
  "Hong Kong",
  "Índia",
  "Jamaica",
  "Japão",
  "Jordânia",
  "México",
  "Polônia",
  "Porto Rico",
  "Portugal",
  "Qatar",
  "Quênia",
  "Uruguai",
  "Venezuela",
  "Vietnã"
];

function getRandomFromList(randomList) {
  return randomList[getRandomInt(0, randomList.length)];
}

function getRiskCountries() {
  let countries = [];

  for( let i = 0; i < countryList.length; i++ ) {
    if ( Math.random() <= 0.15)
      countries.push(countryList[i]);
  }
  return countries;

}

var Store = function(parent) {
  var self = this;
  self.parent = parent;
  do {
    self.name = faker.company.companyName();
  } while (self.name.length > 15);
  self.riskCountries = getRiskCountries();
  self.customer = ko.observable(new Customer(self));
};


var Customer = function(store) {
  var self = this;

  self.firstName = faker.name.firstName();
  self.lastName = faker.name.lastName();
  self.name = self.firstName + ' ' + self.lastName;
  self.avatar = faker.image.avatar();
  self.registrationCountryMatches = Math.random() >= 0.5;
  self.timeOfCharge = getRandomInt(0,23);
  self.previousPurchases = Math.random()  <= 0.5;
  self.timeSinceRegistration = Math.random() >= 0.75 ? getRandomInt(0,2160) : 0;
  self.purchaseValue = getRandomInt(1,1000);
  self.freeEmail = Math.random() >= 0.5;
  self.email = faker.internet.email(self.firstName, self.lastName, getRandomFromList(self.freeEmail ? freeEmailProviderList : paidEmailProviderList));
  self.countryOfRegistration = getRandomFromList(countryList);
  self.countryOfCharge =  Math.random() >= 0.3 ? getRandomFromList(countryList) : self.countryOfRegistration;
  self.webProxy =  self.countryOfRegistration !== self.countryOfCharge;
  self.ipCountriesMatch = self.countryOfRegistration === self.countryOfCharge;
  self.highRiskCountry = store.riskCountries.includes(self.countryOfCharge);
  self.criticalTime = self.timeOfCharge < 9 || self.timeOfCharge > 18;

  self.prepareData = function() {
    return {
      "registration countries match": self.countryOfRegistration === self.countryOfCharge,
      "time of charge": self.timeOfCharge,
      "previous purchases" : self.previousPurchases,
      "ip countries match": self.ipCountriesMatch,
      "time since registration" : self.timeSinceRegistration,
      "purchase size" : self.purchaseValue,
      "high risk country" : self.highRiskCountry,
      "free email" : self.freeEmail,
      "web proxy" : self.webProxy
    };
  };

  self.payload = self.prepareData();

  self.evaluate = function() {
    store.parent.showLoading(true);
    console.log(store.parent.showLoading(true));
    var success = function () {
      console.log("success");
    };
    var error = function () {
      console.log("error");
    };

    // Api.post(self.payload, success, error);
  }

};

var MainViewModel = function() {
  var self = this;
  self.stores = ko.observableArray([]);
  self.showLoading = ko.observable(false);
  for (let i = 0; i < 3; i++){
    self.stores()[i] = new Store(self);
  }
  console.log(self.stores());

};

ko.applyBindings(new MainViewModel()); // This makes Knockout get to work

$( document ).ready(function () {
  $('[data-toggle="tooltip"]').tooltip()
});
