const DateDiff = class {
  constructor(startDate, endDate) {
      this.start = startDate;
      this.end = endDate;
  }
  get startDate(){
      return this.start.toString();
  }

  get endDate(){
      return this.end.toString();
  }

  inDays(){
      return Math.floor((this.end.getTime() - this.start.getTime())/(1000*3600*24));
  }

  inWeeks(){
      return Math.floor(this.inDays()/7);
  }

  inMonths(){
      return Math.floor(this.inWeeks()/4);
  }

  inYears(){
      return Math.floor(this.inDays()/365);
  }

};

module.exports = DateDiff;