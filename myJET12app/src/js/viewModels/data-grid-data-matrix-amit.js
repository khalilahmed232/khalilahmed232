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
  "ojs/ojselectsingle",
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
  ojDataGrid,
  ojSelectSingle
) {
  function ButtonViewModel() {
    this.connected = () => {
      $(".oj-web-applayout-header").hide();
      $(".oj-web-applayout-footer").hide();

      this.viewType = ko.observable();
      let viewTypeArr = [
        { id: 1, display: "Hours" },
        { id: 2, display: "Daily" },
        { id: 3, display: "Weekly" },
        { id: 4, display: "Monthly" },
      ];
      this.viewTypeADP = new ArrayDataProvider(viewTypeArr, {
        keyAttributes: "id",
      });

      this.columnHeaders = ko.observable([]);
      this.printMessage = ko.observable("printing messsage");

      let dataGridViewModel = this;
      this.generateColumnHeaders = function () {
        dataGridViewModel.printMessage("function called");
        let colHeaderArr = [];
        if (dataGridViewModel.viewType() == 1) {
          for (let i = 0; i < 24; i++) {
            colHeaderArr.push(i);
          }
        } else if (dataGridViewModel.viewType() == 2) {
          for (let i = 1; i <= 31; i++) {
            colHeaderArr.push(i);
          }
        } else if (dataGridViewModel.viewType() == 3) {
          for (let i = 1; i <= 53; i++) {
            colHeaderArr.push(i);
          }
        } else if (dataGridViewModel.viewType() == 4) {
          colHeaderArr = ["Jan", "Feb", "Mar", "Apr", "May"];
        }
        dataGridViewModel.columnHeaders(colHeaderArr);
      };

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
