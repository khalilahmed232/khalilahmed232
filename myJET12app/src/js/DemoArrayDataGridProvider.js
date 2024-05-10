define([
  "require",
  "exports",
  "ojs/ojdatagridprovider",
  "ojs/ojeventtarget",
], function (require, exports, ojdatagridprovider_1, ojeventtarget_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DemoArrayDataGridProvider = void 0;
  class DemoArrayDataGridProvider {
    constructor(
      dataParameters,
      sortParameters,
      mergeStrategy,
      requiredParameters
    ) {
      this.dataParameters = dataParameters;
      this.sortParameters = sortParameters;
      this.mergeStrategy = mergeStrategy;
      this.requiredParameters = requiredParameters;
      this.version = 0;
      this.totals = {};
      this.levels = {};
      this.setTotalCounts = () => {
        this.totals.column = Math.max(
          this.dataParameters.data?.[0]
            ? this.dataParameters.data[0].length
            : -1,
          this.dataParameters.columnHeader?.[0]
            ? this.dataParameters.columnHeader[0].length
            : -1,
          this.dataParameters.columnEndHeader?.[0]
            ? this.dataParameters.columnEndHeader[0].length
            : -1
        );
        this.totals.row = Math.max(
          this.dataParameters.data ? this.dataParameters.data.length : -1,
          this.dataParameters.rowHeader?.[0]
            ? this.dataParameters.rowHeader[0].length
            : -1,
          this.dataParameters.rowEndHeader?.[0]
            ? this.dataParameters.rowEndHeader[0].length
            : -1
        );
        this.levels.row = Math.max(0, this.dataParameters.rowHeader?.length);
        this.levels.column = Math.max(
          0,
          this.dataParameters.columnHeader?.length
        );
        this.levels.rowEnd = Math.max(
          0,
          this.dataParameters.rowEndHeader?.length
        );
        this.levels.columnEnd = Math.max(
          0,
          this.dataParameters.columnEndHeader?.length
        );
      };
      this.GridItem = class {
        constructor(metadata, data) {
          this.metadata = metadata;
          this.data = data;
        }
      };
      this.GridBodyItem = class {
        constructor(
          rowExtent,
          columnExtent,
          rowIndex,
          columnIndex,
          metadata,
          data
        ) {
          this.rowExtent = rowExtent;
          this.columnExtent = columnExtent;
          this.rowIndex = rowIndex;
          this.columnIndex = columnIndex;
          this.metadata = metadata;
          this.data = data;
        }
      };
      this.GridHeaderItem = class {
        constructor(index, extent, level, depth, metadata, data) {
          this.index = index;
          this.extent = extent;
          this.level = level;
          this.depth = depth;
          this.metadata = metadata;
          this.data = data;
        }
      };
      this.GridHeaderMetadata = class {
        constructor(sortDirection, showRequired) {
          this.sortDirection = sortDirection;
          this.showRequired = showRequired;
        }
      };
      this.FetchByOffsetGridResults = class {
        constructor(
          fetchParameters,
          rowDone,
          columnDone,
          rowOffset,
          columnOffset,
          rowCount,
          columnCount,
          totalRowCount,
          totalColumnCount,
          results,
          version,
          next
        ) {
          this.fetchParameters = fetchParameters;
          this.rowDone = rowDone;
          this.columnDone = columnDone;
          this.rowOffset = rowOffset;
          this.columnOffset = columnOffset;
          this.rowCount = rowCount;
          this.columnCount = columnCount;
          this.totalRowCount = totalRowCount;
          this.totalColumnCount = totalColumnCount;
          this.results = results;
          this.version = version;
          this.next = next;
        }
      };
      this.setTotalCounts();
    }
    fetchByOffset(parameters) {
      return new Promise((resolve) => {
        const rowOffset = parameters.rowOffset;
        const columnOffset = parameters.columnOffset;
        const rowCount = Math.min(
          parameters.rowCount,
          this.totals.row - rowOffset
        );
        const columnCount = Math.min(
          parameters.columnCount,
          this.totals.column - columnOffset
        );
        const rowDone = rowOffset + rowCount >= this.totals.row;
        const columnDone = columnOffset + columnCount >= this.totals.column;
        const version = this.version;
        const databody = this.getResults(
          this.dataParameters.data,
          this.mergeStrategy?.data,
          {
            outerOffset: rowOffset,
            innerOffset: columnOffset,
            outerCount: rowCount,
            innerCount: columnCount,
          },
          () => {
            return true;
          },
          this.createDataItem.bind(this)
        );
        const rowHeader = this.getResults(
          this.dataParameters.rowHeader,
          this.mergeStrategy?.rowHeader,
          {
            outerOffset: 0,
            innerOffset: rowOffset,
            outerCount: this.levels.row,
            innerCount: rowCount,
          },
          this.mergeInnerHeaderValid,
          this.createHeaderItem.bind(
            this,
            DemoArrayDataGridProvider.row,
            this.sortParameters?.rowSortable
          )
        );
        const columnHeader = this.getResults(
          this.dataParameters.columnHeader,
          this.mergeStrategy?.columnHeader,
          {
            outerOffset: 0,
            innerOffset: columnOffset,
            outerCount: this.levels.column,
            innerCount: columnCount,
          },
          this.mergeInnerHeaderValid,
          this.createHeaderItem.bind(
            this,
            DemoArrayDataGridProvider.column,
            this.sortParameters?.columnSortable
          )
        );
        const rowEndHeader = this.getResults(
          this.dataParameters.rowEndHeader,
          this.mergeStrategy?.rowEndHeader,
          {
            outerOffset: 0,
            innerOffset: rowOffset,
            outerCount: this.levels.rowEnd,
            innerCount: rowCount,
          },
          this.mergeInnerHeaderValid,
          this.createHeaderItem.bind(
            this,
            DemoArrayDataGridProvider.rowEnd,
            false
          )
        );
        const columnEndHeader = this.getResults(
          this.dataParameters.columnEndHeader,
          this.mergeStrategy?.columnEndHeader,
          {
            outerOffset: 0,
            innerOffset: columnOffset,
            outerCount: this.levels.columnEnd,
            innerCount: columnCount,
          },
          this.mergeInnerHeaderValid,
          this.createHeaderItem.bind(
            this,
            DemoArrayDataGridProvider.columnEnd,
            false
          )
        );
        const rowHeaderLabel = this.getHeaderLabelResults(
          this.dataParameters.rowHeaderLabel
        );
        const columnHeaderLabel = this.getHeaderLabelResults(
          this.dataParameters.columnHeaderLabel
        );
        const rowEndHeaderLabel = this.getHeaderLabelResults(
          this.dataParameters.rowEndHeaderLabel
        );
        const columnEndHeaderLabel = this.getHeaderLabelResults(
          this.dataParameters.columnEndHeaderLabel
        );
        const next = null;
        const results = {
          databody: databody,
          rowHeader: rowHeader,
          columnHeader: columnHeader,
          rowEndHeader: rowEndHeader,
          columnEndHeader: columnEndHeader,
          columnHeaderLabel: columnHeaderLabel,
          rowHeaderLabel: rowHeaderLabel,
          columnEndHeaderLabel: columnEndHeaderLabel,
          rowEndHeaderLabel: rowEndHeaderLabel,
        };
        resolve(
          new this.FetchByOffsetGridResults(
            parameters,
            rowDone,
            columnDone,
            rowOffset,
            columnOffset,
            rowCount,
            columnCount,
            this.totals.row,
            this.totals.column,
            results,
            version,
            next
          )
        );
      });
    }
    getCapability(capabilityName) {
      if (capabilityName === "version") {
        return "monotonicallyIncreasing";
      }
      return null;
    }
    isEmpty() {
      return this.totals.column <= 0 && this.totals.row <= 0 ? "yes" : "no";
    }
    setSortParameters(sortParameters) {
      this.sortParameters = sortParameters;
    }
    setDataParameters(dataParameters) {
      this.dataParameters = dataParameters;
      this.setTotalCounts();
    }
    doAdd(detail) {
      const count = detail.ranges.reduce((acc, obj) => acc + obj.count, 0);
      if (detail.axis === "column") {
        this.totals.column = this.totals.column + count;
      } else if (detail.axis === "row") {
        this.totals.row = this.totals.row + count;
      }
      this.dispatchEvent(
        new ojdatagridprovider_1.DataGridProviderAddEvent(detail)
      );
    }
    doUpdate(detail) {
      this.dispatchEvent(
        new ojdatagridprovider_1.DataGridProviderUpdateEvent(detail)
      );
    }
    doRemove(detail) {
      const count = detail.ranges.reduce((acc, obj) => acc + obj.count, 0);
      if (detail.axis === "column") {
        this.totals.column = this.totals.column - count;
      } else if (detail.axis === "row") {
        this.totals.row = this.totals.row - count;
      }
      this.dispatchEvent(
        new ojdatagridprovider_1.DataGridProviderRemoveEvent(detail)
      );
    }
    doRefresh() {
      this.dispatchEvent(
        new ojdatagridprovider_1.DataGridProviderRefreshEvent()
      );
    }
    getResults(
      outerValues,
      mergeDimension,
      resultsParams,
      mergeInnerValid,
      createItem
    ) {
      const { outerOffset, innerOffset, outerCount, innerCount } =
        resultsParams;
      if (outerValues?.[0]?.length > 0) {
        const results = [];
        const mergeMatrix = this.createTempMatrix(
          outerOffset,
          innerOffset,
          outerCount,
          innerCount
        );
        for (
          let outer = outerOffset;
          outer < outerOffset + outerCount;
          outer++
        ) {
          const innerValues = outerValues[outer];
          for (
            let inner = innerOffset;
            inner < innerOffset + innerCount;
            inner++
          ) {
            if (this.isInMatrix(mergeMatrix, outer, inner)) {
              continue;
            }
            const data = innerValues[inner];
            const mergeResults = this.getMergeDimensions(
              outerValues,
              mergeDimension,
              mergeInnerValid,
              {
                outerOffset: outer,
                innerOffset: inner,
                outerStart: outerOffset,
                innerStart: innerOffset,
              }
            );
            results.push(createItem(data, mergeResults));
            this.addToMatrix(mergeMatrix, mergeResults);
          }
        }
        return results;
      }
      return null;
    }
    createDataItem(data, mergeResults) {
      const rowOffset = mergeResults.outerOffset;
      const columnOffset = mergeResults.innerOffset;
      const rowExtent = mergeResults.outerExtent;
      const columnExtent = mergeResults.innerExtent;
      const metadata = {};
      return new this.GridBodyItem(
        rowExtent,
        columnExtent,
        rowOffset,
        columnOffset,
        metadata,
        data
      );
    }
    createHeaderItem(axis, sortable, data, mergeResults) {
      const index = mergeResults.innerOffset;
      const level =
        this.levels[axis] - mergeResults.outerOffset - mergeResults.outerExtent;
      const required = this.isRequired(index, axis, level);
      const extent = mergeResults.innerExtent;
      const depth = mergeResults.outerExtent;
      const metadata = this.getHeaderMetadata(
        axis,
        index,
        level,
        sortable,
        required
      );
      return new this.GridHeaderItem(
        index,
        extent,
        level,
        depth,
        metadata,
        data
      );
    }
    isRequired(currentIndex, axis, currentLevel) {
      if (this.requiredParameters?.[axis]) {
        return this.requiredParameters[axis].some((header) => {
          return header.index === currentIndex && header.level === currentLevel;
        });
      }
      return false;
    }
    mergeInnerHeaderValid(offset) {
      return offset !== 0;
    }
    getHeaderMetadata(axis, index, level, sortable, required) {
      if (sortable) {
        if (
          this.sortParameters?.sortValue?.axis === axis &&
          this.sortParameters?.sortValue?.index === index
        ) {
          return new this.GridHeaderMetadata(
            this.sortParameters?.sortValue.direction,
            required
          );
        } else {
          return new this.GridHeaderMetadata(
            DemoArrayDataGridProvider.unsorted,
            required
          );
        }
      } else {
        return new this.GridHeaderMetadata(null, required);
      }
    }
    getHeaderLabelResults(headerLabels) {
      if (headerLabels?.length > 0) {
        return headerLabels.map((label) => {
          return new this.GridItem({}, { data: label });
        });
      }
      return null;
    }
    createTempMatrix(outerOffset, innerOffset, outerCount, innerCount) {
      const matrix = new Array(outerCount);
      for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(innerCount).fill(false);
      }
      return { matrix, outerOffset, innerOffset };
    }
    isInMatrix(matrixObject, outerOffset, innerOffset) {
      return matrixObject.matrix[outerOffset - matrixObject.outerOffset][
        innerOffset - matrixObject.innerOffset
      ];
    }
    addToMatrix(matrixObject, mergeParams) {
      const { outerOffset, innerOffset, outerExtent, innerExtent } =
        mergeParams;
      for (let i = 0; i < outerExtent; i++) {
        for (let j = 0; j < innerExtent; j++) {
          matrixObject.matrix[outerOffset - matrixObject.outerOffset + i][
            innerOffset - matrixObject.innerOffset + j
          ] = true;
        }
      }
    }
    getMergeDimensions(data, mergeDimension, shouldMergeInner, mergeParams) {
      const { outerOffset, innerOffset, outerStart, innerStart } = mergeParams;
      const innerMergeFunction = mergeDimension?.inner;
      const outerMergeFunction = mergeDimension?.outer;
      let finalInnerOffset = innerOffset;
      let finalOuterOffset = outerOffset;
      let innerExtent = 1;
      let outerExtent = 1;
      if (shouldMergeInner(outerOffset) && innerMergeFunction != null) {
        let currentInnerOffset = innerOffset;
        let previousInnerOffset = innerOffset - 1;
        if (innerStart === currentInnerOffset) {
          while (data[finalOuterOffset][previousInnerOffset]) {
            if (
              innerMergeFunction(
                data[finalOuterOffset][currentInnerOffset],
                data[finalOuterOffset][previousInnerOffset]
              )
            ) {
              innerExtent += 1;
              finalInnerOffset -= 1;
              currentInnerOffset -= 1;
              previousInnerOffset -= 1;
            } else {
              break;
            }
          }
        }
        currentInnerOffset = innerOffset;
        let nextInnerOffset = innerOffset + 1;
        while (data[finalOuterOffset][nextInnerOffset]) {
          if (
            innerMergeFunction(
              data[finalOuterOffset][currentInnerOffset],
              data[finalOuterOffset][nextInnerOffset]
            )
          ) {
            innerExtent += 1;
            currentInnerOffset += 1;
            nextInnerOffset += 1;
          } else {
            break;
          }
        }
      }
      if (mergeDimension?.outer != null) {
        let currentOuterOffset = outerOffset;
        let previousOuterOffset = outerOffset - 1;
        let breakVar = true;
        if (outerStart === currentOuterOffset) {
          while (data[previousOuterOffset] && breakVar) {
            for (
              let i = finalInnerOffset;
              i < finalInnerOffset + innerExtent;
              i++
            ) {
              if (
                outerMergeFunction(
                  data[currentOuterOffset][i],
                  data[previousOuterOffset][i]
                )
              ) {
                if (i === finalInnerOffset + innerExtent - 1) {
                  outerExtent += 1;
                  finalOuterOffset -= 1;
                }
              } else {
                breakVar = false;
                break;
              }
            }
            currentOuterOffset -= 1;
            previousOuterOffset -= 1;
          }
        }
        currentOuterOffset = outerOffset;
        let nextOuterOffset = outerOffset + 1;
        breakVar = true;
        while (data[nextOuterOffset] && breakVar) {
          for (
            let i = finalInnerOffset;
            i < finalInnerOffset + innerExtent;
            i++
          ) {
            if (
              outerMergeFunction(
                data[currentOuterOffset][i],
                data[nextOuterOffset][i]
              )
            ) {
              if (i === finalInnerOffset + innerExtent - 1) {
                outerExtent += 1;
              }
            } else {
              breakVar = false;
              break;
            }
          }
          currentOuterOffset += 1;
          nextOuterOffset += 1;
        }
      }
      return {
        innerOffset: finalInnerOffset,
        outerOffset: finalOuterOffset,
        innerExtent,
        outerExtent,
      };
    }
  }
  DemoArrayDataGridProvider.row = "row";
  DemoArrayDataGridProvider.rowEnd = "rowEnd";
  DemoArrayDataGridProvider.column = "column";
  DemoArrayDataGridProvider.columnEnd = "columnEnd";
  DemoArrayDataGridProvider.unsorted = "unsorted";
  exports.DemoArrayDataGridProvider = DemoArrayDataGridProvider;
  ojeventtarget_1.EventTargetMixin.applyMixin(DemoArrayDataGridProvider);
});
