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
  "ojs/ojdatagrid",
], function (
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
  ojDataGrid
) {
  function ButtonViewModel() {
    this.connected = () => {
      if (window.self !== window.top) {
        $(".oj-web-applayout-header").hide();
        $(".oj-web-applayout-footer").hide();
      }

      let empData = JSON.parse(empDataText);
      this.employeeListADP = new ArrayDataProvider(empData.employees, {
        keyAttributes: "id",
      });

      this.headerColStyle = function (cellContext) {
        let widthArr = [50, 120, 100, 300];
        return "width:" + widthArr[cellContext.index] + "px;margin:0px;";
      };
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
