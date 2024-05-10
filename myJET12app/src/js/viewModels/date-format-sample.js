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
  "ojs/ojconverter-datetime",
  "ojs/ojdatetimepicker",
  "ojs/ojconverterutils-i18n",
], function (
  numberConverter,
  accUtils,
  buttonPageData,
  empDataText,
  ko,
  ArrayDataProvider,
  HtmlUtils,
  binddom,
  ojDialog,
  formlayout,
  inputText,
  ojTable,
  ojLabel,
  ojLabelValue,
  ojProgressCircle,
  datetimeConverter,
  ojInputDate,
  ojconverterutils_i18n_1
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
        pattern: "dd-MMM-yyyy hh:mm:ss a",
      };

      let sampleValues = [
        "2024-01-18T13:59:23+05:30",
        "2024-12-01T00:53:23+05:30",
        "2024-02-29T05:53:23+05:30",
        "2023-12-31T00:53:23+05:30",
        "2023-02-28T00:53:23+05:30",
      ];

      this.config = ko.observable(JSON.stringify(convertorConfigJson, null, 2));

      this.amount = ko.observable(new Date().toISOString());

      this.amountDateStr = ko.observable(
        ojconverterutils_i18n_1.IntlConverterUtils.dateToLocalIsoDateString(
          new Date()
        )
      );
      this.configRawValue = ko.observable(this.config());

      this.dateConverter = ko.observable(
        new datetimeConverter.IntlDateTimeConverter({
          pattern: "MM/dd/yyyy ",
        })
      );

      this.dateTimeConverter = ko.observable(
        new datetimeConverter.IntlDateTimeConverter({
          pattern: "MM/dd/yyyy hh:mm:ss",
        })
      );

      // this.amountDateStr = ko.observable(dateConverter.toISOString);
      this.amountRawValue = ko.observable(0);

      this.amountDateStrFormatted = ko.computed(function () {
        let dateConverter = new datetimeConverter.IntlDateTimeConverter(
          JSON.parse(this.configRawValue())
        );
        return dateConverter.format(this.amountDateStr());
      }, this);
      this.amountFormatted = ko.computed(function () {
        let dateConverter = new datetimeConverter.IntlDateTimeConverter(
          JSON.parse(this.configRawValue())
        );
        return dateConverter.format(this.amountRawValue());
      }, this);

      this.amountEUR = ko.observable(30);

      this.listOfNumbers = ko.observable(sampleValues.join("\n"));
      this.listOfNumbersRawValue = ko.observable(this.listOfNumbers());

      this.listOfNumFormatted = ko.computed(function () {
        let valuesArray = this.listOfNumbersRawValue().split("\n");

        let dateConverter = new datetimeConverter.IntlDateTimeConverter(
          JSON.parse(this.configRawValue())
        );

        let formattedArray = [];
        for (let i = 0; i < valuesArray.length; i++) {
          let formattedValue = dateConverter.format(valuesArray[i]);
          formattedArray.push(formattedValue);
        }
        return formattedArray.join("\n");
      }, this);
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
