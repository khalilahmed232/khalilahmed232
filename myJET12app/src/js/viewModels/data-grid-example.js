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
  "text!../data/salary_grid_data.json",
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
  salaryDataText,
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

      let salData = JSON.parse(salaryDataText);
      this.salaryDataADP = new ArrayDataProvider(salData.salaries, {
        keyAttributes: "id",
      });

      this.headerColStyle = function (cellContext) {
        let widthArr = [50, 120, 100, 200, 120, 120];
        return "width:" + widthArr[cellContext.index] + "px;";
      };
      this.cellClassNameFunc = function (cellContext) {
        let cellRowIndex = cellContext.indexes.row;
        let classNameStr = "oj-helper-justify-content ";
        // if (cellRowIndex % 3 === 0) {
        //   classNameStr += "oj-bg-success-10 oj-text-color-success";
        // } else if (cellRowIndex % 3 === 1) {
        //   classNameStr += "oj-bg-danger-30	 oj-text-color-danger";
        // } else {
        //   classNameStr += "oj-bg-warning-30 oj-text-color-warning";
        // }

        let key = cellContext.key;
        console.log(cellContext);
        console.log(cellContext.datasource.data[cellRowIndex]);
        let rowData = cellContext.datasource.data.find((x) => x.id === key);
        if (rowData.city === "Delhi" || rowData.city === "Banglore") {
          classNameStr += "oj-bg-success-10 oj-text-color-success";
        } else if (rowData.city === "Hyderabad" || rowData.city === "Kolkata") {
          classNameStr += "oj-bg-danger-30	 oj-text-color-danger";
        } else if (rowData.city === "Mumbai" || rowData.city === "Nagpur") {
          classNameStr += "oj-bg-warning-30 oj-text-color-warning";
        }

        cellContext.datasource[cellRowIndex];

        return classNameStr;
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
