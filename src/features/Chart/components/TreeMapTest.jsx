import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsTreemap from 'highcharts/modules/treemap';

HighchartsTreemap(Highcharts);

const data = [
  {
    name: 'Phân ngành A',
    value: 100,
    code: ['A1', 'A2', 'A3']
  },
  {
    name: 'Phân ngành B',
    value: 200,
    code: ['B1', 'B2', 'B3']
  },
  // ...
];

const TreeMapTest = () => {
  const [codes, setCodes] = useState([]);

  const handleClick = (e) => {
    if (e.point.node.children.length === 0) {
      setCodes(e.point.node.options.code);
    }
  };

  const options = {
    series: [
      {
        type: 'treemap',
        layoutAlgorithm: 'squarified',
        allowDrillToNode: true,
        data: data,
        levels: [
          {
            level: 1,
            dataLabels: {
              enabled: true,
              align: 'left',
              verticalAlign: 'top',
              style: {
                fontSize: '15px',
                fontWeight: 'bold'
              }
            }
          },
          {
            level: 2,
            dataLabels: {
              enabled: true,
              align: 'left',
              verticalAlign: 'top',
              style: {
                fontSize: '13px'
              }
            }
          }
        ],
        events: {
          click: handleClick
        }
      }
    ]
  };

  if (codes.length > 0) {
    options.series[0].data = data.filter(d => codes.includes(d.code));
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default TreeMapTest;
