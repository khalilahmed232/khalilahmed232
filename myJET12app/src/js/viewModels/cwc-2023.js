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
  "../accUtils",
  "text!../data/countries.json",
  "text!../data/matches.json",
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
  "ojs/ojdatagridprovider",
  "../DemoArrayDataGridProvider",
], function (
  accUtils,
  countryData,
  matchData,
  ko,
  ArrayDataProvider,
  HtmlUtils,
  binddom,
  dialog,
  formlayout,
  inputText,
  ojTable,
  ojLabel,
  ojLabelValue,
  ojProgressCircle,
  ojDataGridProvider,
  DemoArrayDataGridProvider
) {
  function CwcViewModel() {
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

    let countryArray = JSON.parse(countryData).countries;

    this.dataprovider = new ArrayDataProvider(countryArray, {
      keyAttributes: "DepartmentId",
      implicitSort: [{ attribute: "DepartmentId", direction: "ascending" }],
    });

    this.dataGridProvider = ko.observable(
      new DemoArrayDataGridProvider(
        {
          data: this.data,
          rowHeader: this.rowHeaders,
          columnHeader: this.columnHeaders,
          rowHeaderLabel: this.rowLabel,
          columnHeaderLabel: this.columnLabel,
        },
        {
          columnSortable: true,
        },
        {}
      )
    );

    this.connected = () => {
      if (window.self !== window.top) {
        $(".oj-web-applayout-header").hide();
        $(".oj-web-applayout-footer").hide();
      }

      let countryArray = JSON.parse(countryData).countries;
      console.log(countryArray);
      let mactchArray = JSON.parse(matchData).matches;
      console.log(mactchArray);
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
  return CwcViewModel;
});
