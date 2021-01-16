export const PinColor = {
  veryGood: '#3CCCFF',
  good: '#92D050',
  normal: '#FDFF00',
  bad: '#FFA200',
  veryBad: '#FF3C3A',
};

export const ProvinceColor = {
  ชลบุรี: '#EFE4BE',
  ฉะเชิงเทรา: '#BFFFE8',
  ระยอง: '#E9FEBE',
  จันทบุรี: '#FEBEE8',
  สมุทรปราการ: '#FFBEBD',
  ตราด: '#E8BFFF',
};

export const Config = {
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

export interface PinPosition {
  index: number;
  province: string;
  stationId: string;
  tooltipX: number;
  tooltipY: number;
  x: number;
  y: number;
}

export interface Station {
  LastUpdate: {
    date: string;
    time: string;
    AQI: {
      Level: string; 
      aqi: string;
    }
    CO: {
      value: string, 
      unit: string
    }
    NO2: {
      value: string, 
      unit: string
    }
    O3: {
      value: string, 
      unit: string
    }
    PM10: {
      value: string, 
      unit: string
    }
    PM25: {
      value: string, 
      unit: string
    }
    SO2: {
      value: string, 
      unit: string
    }
  }
  areaEN: string;
  areaTH: string;
  forecast: Array<any>;
  lat: string;
  long: string;
  nameEN: string;
  nameTH: string;
  stationID: string;
  stationType: string;
}

export interface DisplayData {
  index: number;
  x: number;
  y: number;
  tooltipX: number;
  tooltipY: number;
  province: string;
  location: string;
  value: string;
  color: string;
  provinceColor: string;
  isValid: boolean;
}