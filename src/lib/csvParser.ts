// CSV Parser for importing herb/food inventory
import { HerbFood } from './storage';

export interface ImportOptions {
  mode: 'replace' | 'merge' | 'update';
}

/**
 * Parse CSV text into array of objects
 */
export const parseCSV = (csvText: string): Record<string, string>[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) {
    throw new Error('CSV file must have headers and at least one row of data');
  }

  // Remove BOM if present
  let firstLine = lines[0];
  if (firstLine.charCodeAt(0) === 0xFEFF) {
    firstLine = firstLine.slice(1);
  }

  // Parse headers
  const headers = firstLine.split(',').map(h => h.trim().replace(/^"|"$/g, ''));

  // Parse rows
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Skip empty lines

    const values = parseCSVLine(line);
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    rows.push(row);
  }

  return rows;
};

/**
 * Parse a single CSV line handling quoted values with commas
 */
const parseCSVLine = (line: string): string[] => {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
};

/**
 * Map CSV row to HerbFood object
 */
export const mapCSVToHerbFood = (row: Record<string, string>): HerbFood | null => {
  const product = row['Product'] || row['product'] || '';
  if (!product) return null; // Skip rows without product name

  // Determine type based on Supplement Type
  const supplementType = (row['Supplement Type'] || '').toLowerCase().trim();
  let type: 'herb' | 'food' | 'tonic' | 'herb bundle' | 'herb blend' | 'tea bag' | 'pills' | 'topical' | 'supplement' = 'herb';

  // Map supplement type to our type values
  if (supplementType === 'tonic') {
    type = 'tonic';
  } else if (supplementType === 'herb bundle') {
    type = 'herb bundle';
  } else if (supplementType === 'herb blend') {
    type = 'herb blend';
  } else if (supplementType === 'tea bag') {
    type = 'tea bag';
  } else if (supplementType === 'pills') {
    type = 'pills';
  } else if (supplementType === 'topical') {
    type = 'topical';
  } else if (supplementType.includes('food') || (row['Lysine'] && row['Arginine'])) {
    type = 'food';
  } else if (supplementType === 'supplement') {
    type = 'supplement';
  } else {
    type = 'herb'; // default to herb
  }

  const item: HerbFood = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    name: product,
    type: type,
    category: row['Category'] || 'Uncategorized',
    secondaryCategory: row['Sub Category'] || undefined,
    benefits: row['Benefits'] || '',
    description: row['Description'] || undefined,
    ingredients: row['Ingredients'] || undefined,
    dateAdded: new Date().toISOString(),
    purchases: [],
    supplier: row['Supplier'] || undefined,
  };

  // Add herb-specific fields
  if (type === 'herb') {
    item.preparationInstructions = row['Preparation'] || undefined;

    // Parse daily amount (e.g., "3 Cups Daily" -> 3)
    const dailyAmount = row['Daily Amount'] || '';
    const match = dailyAmount.match(/(\d+)/);
    if (match) {
      item.dailyServingRequirement = parseInt(match[1]);
    }

    item.servingSizePerServing = row['Serving'] || undefined;
  }

  // Add food-specific fields (amino acids)
  if (type === 'food') {
    const lysine = parseFloat(row['Lysine'] || '0');
    const arginine = parseFloat(row['Arginine'] || '0');

    if (lysine > 0) item.lysine = lysine;
    if (arginine > 0) item.arginine = arginine;
    item.servingSize = row['Serving Size'] || undefined;
  }

  return item;
};

/**
 * Import CSV and convert to HerbFood array
 */
export const importCSV = (csvText: string): HerbFood[] => {
  const rows = parseCSV(csvText);
  const items: HerbFood[] = [];

  for (const row of rows) {
    const item = mapCSVToHerbFood(row);
    if (item) {
      items.push(item);
    }
  }

  return items;
};

/**
 * Generate CSV template for download
 */
export const generateCSVTemplate = (): string => {
  const headers = [
    'Product',
    'Supplier',
    'Ingredients',
    'Serving',
    'Daily Amount',
    'Benefits',
    'Category',
    'Sub Category',
    'Supplement Type',
    'Description',
    'Preparation'
  ];

  const example = [
    'Una Del Gato',
    'Bolingo Balance',
    'Una Del Gato',
    '2/4 OZ',
    '3 Cups Daily',
    'Kills Cancer Cells, Boost Immune System',
    'Eliminate Virus',
    'Immune Support',
    'Herb',
    'Cats Claw extract for immune support',
    'Boil 1 cup of spring water and 1 tablespoon'
  ];

  return headers.join(',') + '\n' + example.join(',');
};
