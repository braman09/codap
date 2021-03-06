/* global ReactDOMFactories */
// sc_require('react/dg-react');

DG.React.ready(function () {
  var
      span = ReactDOMFactories.span;

  DG.React.Components.AttributeSummary = DG.React.createComponent(
      (function () {

        /**
         * Props are
         *    cases: {[DG.Case]}  The cases for which we'll provide a summary
         *    attrID: {Number}    This is the attribute whose values we'll summarize
         *    unit: {String}
         */

        return {

          render: function () {
            var tAttrID = this.props.attrID,
                tAllNumeric = true,
                tMin = Number.MAX_VALUE,
                tMax = -Number.MAX_VALUE,
                tUniqueValues = {},
                tNumUniqueValues,
                tSummary;
            this.props.cases.forEach(function (iCase) {
              var tValue = iCase.getValue(tAttrID);
              if (!tUniqueValues[tValue])
                tUniqueValues[tValue] = 0;
              tUniqueValues[tValue]++;
              if (tValue !== '' && isFinite(tValue)) {
                tMin = Math.min(tMin, tValue);
                tMax = Math.max(tMax, tValue);
              } else if( tValue !== '') {
                tAllNumeric = false;
              }
            });
            if( tAllNumeric) {
              tMin = DG.MathUtilities.formatNumber(tMin, 2);
              tMax = DG.MathUtilities.formatNumber(tMax, 2);
            }
            tNumUniqueValues = Object.keys(tUniqueValues).length;
            if( tNumUniqueValues > 2 || tAllNumeric) {
              tSummary = (tMin === "Infinity") ? '' :
                  tAllNumeric ?
                  (tMin === tMax ? (tMin + this.props.unit) :
                      'DG.CaseCard.summaryRange'.loc(tMin, tMax, this.props.unit)) :
                  'DG.CaseCard.summaryValues'.loc(tNumUniqueValues);
              return span({className: 'react-data-card-attribute-summary'}, tSummary);
            }
            else {
              var tUniqueValue = Object.keys( tUniqueValues).filter( function(iKey) {
                return iKey !== 'undefined';
              }).join(', ');
              if(tUniqueValue==='undefined')
                tUniqueValue = '';
              return span({
                className: 'react-data-card-attribute-summary'
              }, tUniqueValue);
            }
          }
        };
      }()), []);

});
