/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your customer ViewModel code goes here
 */

define([
  "ojs/ojconverter-number",
  "../accUtils",
  "text!../data/button_page.json",
  "text!../data/employee_data.json",
  "knockout",
  "ojs/ojarraydataprovider",
  "ojs/ojhtmlutils",
  "ojs/ojbinddom",
  "ojs/ojdialog",
  "ojs/ojformlayout",
  "ojs/ojinputtext",
  "ojs/ojtable",
  "ojs/ojlabel",
  "ojs/ojlabelvalue",
  "ojs/ojprogress-circle",
], function (
  numberConverter,
  accUtils,
  buttonPageData,
  empDataText,
  ko,
  ArrayDataProvider,
  HtmlUtils,
  binddom,
  formlayout,
  inputText,
  ojTable,
  ojLabel,
  ojLabelValue,
  ojProgressCircle
) {
  function ButtonViewModel() {
    // Below are a set of the ViewModel methods invoked by the oj-module component.
    // Please reference the oj-module jsDoc for additional information.

    /**
     * Optional ViewModel method invoked after the View is inserted into the
     * document DOM.  The application can put logic that requires the DOM being
     * attached here.
     * This method might be called multiple times - after the View is created
     * and inserted into the DOM and after the View is reconnected
     * after being disconnected.
     */
    this.connected = () => {
      if (window.self !== window.top) {
        $(".oj-web-applayout-header").hide();
        $(".oj-web-applayout-footer").hide();
      }

      let convertorConfigJson = {
        maximumFractionDigits: 2,
        useGrouping: true,
        currency: "USD",
        currencyDisplay: "symbol",
        style: "currency",
      };

      let sampleValues = [
        100, 2500, 123455300, 45050500, -2929, -3399494.393393939, 0,
      ];

      this.config = ko.observable(JSON.stringify(convertorConfigJson, null, 2));

      this.amount = ko.observable(0);
      this.amountRawValue = ko.observable(0);
      this.configRawValue = ko.observable(this.config());
      this.amountFormatted = ko.computed(function () {
        let numberConvertor = new numberConverter.IntlNumberConverter(
          JSON.parse(this.configRawValue())
        );
        return numberConvertor.format(this.amountRawValue());
      }, this);

      this.amountEUR = ko.observable(30);

      this.listOfNumbers = ko.observable(sampleValues.join("\n"));
      this.listOfNumbersRawValue = ko.observable(this.listOfNumbers());

      this.listOfNumFormatted = ko.computed(function () {
        let valuesArray = this.listOfNumbersRawValue().split("\n");
        let numberConvertor = new numberConverter.IntlNumberConverter(
          JSON.parse(this.configRawValue())
        );
        let formattedArray = [];
        for (let i = 0; i < valuesArray.length; i++) {
          let formattedValue = numberConvertor.format(valuesArray[i]);
          formattedArray.push(formattedValue);
        }
        return formattedArray.join("\n");
      }, this);

      console.log(numberConverter);
    };

    /**
     * Optional ViewModel method invoked after the View is disconnected from the DOM.
     */
    this.disconnected = () => {
      // Implement if needed
    };

    /**
     * Optional ViewModel method invoked after transition to the new View is complete.
     * That includes any possible animation between the old and the new View.
     */
    this.transitionCompleted = () => {
      // Implement if needed
    };
  }

  /*
   * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
   * return a constructor for the ViewModel so that the ViewModel is constructed
   * each time the view is displayed.
   */
  return ButtonViewModel;
});
