export const colors = {
  veryGood: '#3CCCFF',
  good: '#92D050',
  normal: '#FDFF00',
  bad: '#FFA200',
  veryBad: '#FF3C3A',
};

export const provinceColor = {
  ชลบุรี: '#EFE4BE',
  ฉะเชิงเทรา: '#BFFFE8',
  ระยอง: '#E9FEBE',
  จันทบุรี: '#FEBEE8',
  สมุทรปราการ: '#FFBEBD',
  ตราด: '#E8BFFF',
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
    pm25: 'ฝุ่น PM<sub class="small-font">2.5</sub>',
  },
  path: {
    aqi: 'aqi',
    pm25: 'value',
  },
};
