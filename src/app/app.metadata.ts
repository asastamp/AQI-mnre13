export const pins = [
  {
    province: 'จ.สมุทรปราการ',
    stationId: '16t',
    x: 81,
    y: 49,
    tooltipX: -90,
    tooltipY: -150,
  },
  {
    stationId: '18t',
    x: 96,
    y: 55,
    tooltipX: 40,
    tooltipY: -150,
  },
  {
    stationId: '08t',
    x: 73,
    y: 35,
    tooltipX: 170,
    tooltipY: -150,
  },

  {
    stationId: '17t',
    x: 87,
    y: 28,
    tooltipX: 300,
    tooltipY: -150,
  },

  {
    stationId: '19t',
    x: 100,
    y: 100,
    tooltipX: 430,
    tooltipY: -150,
  },
  {
    province: 'จ.ฉะเชิงเทรา',
    stationId: '60t',
    x: 100,
    y: 240,
    tooltipX: 570,
    tooltipY: 40,
  },
  {
    province: 'จ.ชลบุรี',
    stationId: '34t',
    x: 155,
    y: 160,
    tooltipX: -90,
    tooltipY: 200,
  },
  {
    stationId: '33t',
    x: 240,
    y: 185,
    tooltipX: -90,
    tooltipY: 330,
  },
  {
    stationId: '32t',
    x: 235,
    y: 140,
    tooltipX: -90,
    tooltipY: 460,
  },
  {
    province: 'จ.ระยอง',
    stationId: '29t',
    x: 346,
    y: 199,
    tooltipX: 80,
    tooltipY: 480,
  },
  {
    stationId: '30t',
    x: 338,
    y: 227,

    tooltipX: 210,
    tooltipY: 480,
  },
  {
    stationId: '31t',
    x: 334,
    y: 184,
    tooltipX: 340,
    tooltipY: 480,
  },
  {
    stationId: '74t',
    x: 348,
    y: 214,

    tooltipX: 80,
    tooltipY: 620,
  },
  {
    stationId: 'm9',
    x: 350,
    y: 240,
    tooltipX: 210,
    tooltipY: 620,
  },
  {
    stationId: '28t',
    x: 260,
    y: 200,
    tooltipX: 340,
    tooltipY: 620,
  },
];

export const colors = {
  veryGood: '#3CCCFF',
  good: '#92D050',
  normal: '#FDFF00',
  bad: '#FFA200',
  veryBad: '#FF3C3A',
};

export const provinceColor = {
  ชลบุรี: '#FCE0B8',
  ฉะเชิงเทรา: '#FDFF73',
  ระยอง: '#DEFCD8',
  จันทบุรี: '#FDCAF3',
  สมุทรปราการ: '#B3EDFB',
  ตราด: '#B6C1FC',
};

export const config = {
  tube: {
    aqi: {
      header: 'คุณภาพอากาศ (AQI)',
      veryGood: '0-25',
      good: '26-50',
      normal: '51-100',
      bad: '101-200',
      veryBad: '201 ขึ้นไป',
    },
    pm25: {
      header: 'ฝุ่นละออกขนาดเล็กไม่เกิน PM2.5 (µg/m³)',
      veryGood: '0-25',
      good: '26-37',
      normal: '38-50',
      bad: '51-90',
      veryBad: '90 ขึ้นไป',
    },
  },
  header: {
    aqi: 'คุณภาพอากาศ',
    pm25: 'ฝุ่น PM<sub style="font-size: 12px">2.5</sub>',
  },
  path: {
    aqi: 'aqi',
    pm25: 'value',
  },
};
