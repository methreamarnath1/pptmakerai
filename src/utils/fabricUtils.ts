
import { Canvas, Rect, Text, Group } from "fabric";

interface ChartOptions {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  title?: string;
  barColors?: string[];
  backgroundColor?: string;
  textColor?: string;
}

export const createBarChart = (
  canvas: Canvas,
  data: number[],
  options: ChartOptions = {}
) => {
  const {
    left = 50,
    top = 50,
    width = 300,
    height = 200,
    title = 'Chart',
    barColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
    backgroundColor = '#f8f9fa',
    textColor = '#333333',
  } = options;

  // Create chart background
  const background = new Rect({
    left,
    top,
    width,
    height,
    fill: backgroundColor,
    stroke: '#e2e8f0',
    strokeWidth: 1,
    rx: 4,
    ry: 4,
  });

  // Add chart title
  const chartTitle = new Text(title, {
    left: left + width / 2,
    top: top + 10,
    fontSize: 16,
    fontFamily: 'Arial',
    fill: textColor,
    originX: 'center',
  });

  // Calculate max value for scaling
  const maxValue = Math.max(...data);
  const barWidth = (width - 40) / data.length - 10;
  const barGroup = new Group([], {
    left,
    top,
    selectable: true,
  });

  // Create bars
  data.forEach((value, index) => {
    const barHeight = ((height - 60) * value) / maxValue;
    const barLeft = left + 20 + index * (barWidth + 10);
    const barTop = top + height - 30 - barHeight;

    const bar = new Rect({
      left: barLeft,
      top: barTop,
      width: barWidth,
      height: barHeight,
      fill: barColors[index % barColors.length],
      rx: 2,
      ry: 2,
    });

    // Add bar label
    const label = new Text(value.toString(), {
      left: barLeft + barWidth / 2,
      top: barTop - 15,
      fontSize: 12,
      fontFamily: 'Arial',
      fill: textColor,
      originX: 'center',
    });

    // Add x-axis label
    const xLabel = new Text(`Item ${index + 1}`, {
      left: barLeft + barWidth / 2,
      top: top + height - 20,
      fontSize: 10,
      fontFamily: 'Arial',
      fill: textColor,
      originX: 'center',
    });

    // Add to canvas
    canvas.add(bar);
    canvas.add(label);
    canvas.add(xLabel);
  });

  // Add background and title to canvas first (bottom layer)
  canvas.add(background);
  canvas.add(chartTitle);

  // Move background to back (Fabric.js v6 approach)
  canvas.sendObjectToBack(background);

  // Render canvas
  canvas.renderAll();

  return {
    background,
    title: chartTitle,
  };
};
