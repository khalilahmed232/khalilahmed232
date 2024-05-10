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
  "ojs/ojfilepicker",
  "ojs/ojknockout",
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
  ojFilePicker,
  ojknockout
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
      accUtils.announce("Customers page loaded.", "assertive");
      document.title = "Customers";

      this.showTable = ko.observable(false);
      this.employeeADP = ko.observable(
        new ArrayDataProvider([], {
          keyAttributes: "id",
        })
      );
      let Page = this;
      this.fileSelectListener = (event, data, bindingContext) => {
        let file = event.detail.files[0];

        console.log({ event });

        this.getDetailsFromFile(file).then((value) => {
          console.log(value);
          // Expected output: "Success!"
          this.showTable(true);
          this.employeeADP(
            new ArrayDataProvider(value.inputData, {
              keyAttributes: "id",
            })
          );
        });
      };

      this.getDetailsFromFile = function (file) {
        console.log({ file });

        return new Promise((resolve) => {
          try {
            let fileContent = [];
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = (e) => {
              let result = e.target.result;
              let columns = ["employee", "name", "phone", "salary"];
              let size;
              let inputData = [];
              if (result) {
                let lines = result.split("\n");
                for (let i = 1; i < lines.length; i++) {
                  let row = lines[i];
                  let rowArray = row.split(",");
                  let inputObj = {};
                  inputObj.employee = rowArray[0];
                  inputObj.name = rowArray[1];
                  inputObj.phone = rowArray[2];
                  inputObj.salary = rowArray[3];
                  inputData.push(inputObj);
                }
                resolve({
                  success: true,
                  inputData: inputData,
                  error: "",
                });
              } else {
                resolve({
                  success: false,
                  inputData: [],
                  error: "Empty File : " + result,
                });
              }
            };
          } catch (err) {
            resolve({
              success: false,
              inputData: [],
              error: "Error while reading file : " + err.detail,
            });
          }
        });
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
