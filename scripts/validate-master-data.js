#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/master-data.json');
const raw = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(raw);

function isValidCoordinate(value) {
  const num = Number(value);
  return Number.isFinite(num) && num >= -90 && num <= 90;
}

function isValidLongitude(value) {
  const num = Number(value);
  return Number.isFinite(num) && num >= -180 && num <= 180;
}

function validateCollection(items, label) {
  const problems = [];

  items.forEach((item, index) => {
    const name = item.nombre || item.slug || `${label}[${index}]`;
    const lat = item.lat;
    const lng = item.lng;
    const hasLat = typeof lat !== 'undefined' && lat !== null && lat !== '';
    const hasLng = typeof lng !== 'undefined' && lng !== null && lng !== '';

    if (!hasLat || !hasLng) {
      problems.push(`${label}: ${name} falta lat/lng.`);
      return;
    }

    if (!isValidCoordinate(lat)) {
      problems.push(`${label}: ${name} tiene latitud inválida (${lat}).`);
    }

    if (!isValidLongitude(lng)) {
      problems.push(`${label}: ${name} tiene longitud inválida (${lng}).`);
    }
  });

  return problems;
}

const problems = [];

if (data.municipios && Array.isArray(data.municipios)) {
  problems.push(...validateCollection(data.municipios, 'Municipio'));
}

if (data.negocios && Array.isArray(data.negocios)) {
  problems.push(...validateCollection(data.negocios, 'Negocio'));
}

if (problems.length) {
  console.error('❌ Problemas detectados en master-data.json:');
  problems.forEach((problem) => console.error(` - ${problem}`));
  process.exit(1);
}

console.log('✅ master-data.json pasó la validación de coordenadas y estructura.');
