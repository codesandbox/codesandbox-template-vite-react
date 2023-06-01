export interface DataPoint {
  time: string;
  value: number | undefined;
}

export interface TimeSeries {
  tag: string;
  values: DataPoint[];
  color: string;
}

// Разделяем точку на две половины по времени
function splitData(data: DataPoint[]): [DataPoint[], DataPoint[]] {
  const middleIndex = Math.floor(data.length / 2);
  return [data.slice(0, middleIndex), data.slice(middleIndex)];
}

// Преобразует данные в массив временных рядов
function transformData(data: any[], tags: string[]): TimeSeries[] {
  return tags.map((tag) => ({
    tag,
    values: data.map((d) => ({
      time: d.time,
      value: d[tag] ? +d[tag] : undefined,
    })),
  }));
}

// Применяет функцию упрощения к каждому временному ряду
function simplifyTimeSeries(
  timeSeries: TimeSeries[],
  epsilon: number
): TimeSeries[] {
  return timeSeries.map((series) => ({
    ...series,
    values: simplifyData(series.values, epsilon),
  }));
}

// Реализуем алгоритм Ramer-Douglas-Peucker
function simplifyData(data: DataPoint[], epsilon: number): DataPoint[] {
  // проверка и обработка случая, когда последний объект не содержит значений
  if (data.length > 0 && data[data.length - 1].value === undefined) {
    data = data.slice(0, -1);
  }

  if (data.length < 3) return data;

  let maxDistIndex = 0;
  let maxDist = 0;

  const [startPoint, endPoint] = [data[0], data[data.length - 1]];

  for (let i = 1; i < data.length - 1; i++) {
    const dist = perpendicularDistance(data[i], startPoint, endPoint);
    if (dist > maxDist) {
      maxDist = dist;
      maxDistIndex = i;
    }
  }

  if (maxDist > epsilon) {
    const [firstSegment, secondSegment] = splitData(data);
    return [
      ...simplifyData(firstSegment, epsilon),
      ...simplifyData(secondSegment, epsilon),
    ];
  } else {
    return [startPoint, endPoint];
  }
}

// Вычисляет перпендикулярное расстояние от точки до линии, образованной двумя другими точками
function perpendicularDistance(
  point: DataPoint,
  linePoint1: DataPoint,
  linePoint2: DataPoint
): number {
  const pointTime = new Date(point.time).getTime();
  const linePoint1Time = new Date(linePoint1.time).getTime();
  const linePoint2Time = new Date(linePoint2.time).getTime();

  const area = Math.abs(
    0.5 *
      (linePoint1.value * linePoint2Time +
        linePoint2.value * pointTime +
        point.value * linePoint1Time -
        linePoint2.value * linePoint1Time -
        point.value * linePoint2Time -
        linePoint1.value * pointTime)
  );
  const bottom = Math.hypot(
    linePoint1.value - linePoint2.value,
    linePoint1Time - linePoint2Time
  );

  return (2 * area) / bottom;
}

// Универсальная функция для обработки входящих данных
function processData(
  incomingData: any[],
  tags: string[],
  pointCount: number
): TimeSeries[] {
  // Преобразуем входящие данные в временные ряды
  let timeSeries = transformData(incomingData, tags);

  // Добавляем цвет для каждого временного ряда
  timeSeries = timeSeries.map((series) => ({
    ...series,
    color: getRandomColor(),
  }));

  const optimalEpsilon = calculateEpsilon(timeSeries, pointCount);

  // Применяем алгоритм Рамера — Дугласа — Пекера для сокращения количества точек данных
  timeSeries = simplifyTimeSeries(timeSeries, optimalEpsilon);

  return timeSeries;
}

function transformForRecharts(timeSeries: TimeSeries[]): any[] {
  let rechartsData: any = {};

  timeSeries.forEach((series) => {
    series.values.forEach((point) => {
      const timestamp = new Date(point.time).getTime();

      if (!rechartsData[timestamp]) {
        rechartsData[timestamp] = { date: timestamp };
      }

      rechartsData[timestamp][series.tag] = {
        value: point.value,
        color: series.color,
      };
    });
  });

  return Object.values(rechartsData);
}

function calculateEpsilon(
  data: TimeSeries[],
  targetPointCount: number
): number {
  let lowerBound = 0;
  let upperBound = Math.max(
    ...data.map((series) =>
      Math.max(...series.values.map((point) => point.value || 0))
    )
  );

  while (upperBound - lowerBound > 0.001) {
    const epsilon = (upperBound + lowerBound) / 2;
    const simplifiedData = simplifyTimeSeries(data, epsilon);

    const totalPointCount = simplifiedData.reduce(
      (total, series) => total + series.values.length,
      0
    );

    if (totalPointCount > targetPointCount) {
      lowerBound = epsilon;
    } else {
      upperBound = epsilon;
    }
  }

  return (upperBound + lowerBound) / 2;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export {
  splitData,
  transformData,
  simplifyTimeSeries,
  simplifyData,
  perpendicularDistance,
  processData,
  transformForRecharts,
  calculateEpsilon,
  getRandomColor,
};
