export type ProductData = {
  url: string;
  title: string;
  image?: string;
  price?: string;
  description?: string;
  seller?: string;
};

/**
 * Parse product card data from HTML attributes
 * Expected format: <div data-product data-url="..." data-title="..." data-image="..." data-price="..." data-description="..." data-seller="..."></div>
 */
function parseProductData(attributes: string): ProductData | null {
  const url = attributes.match(/data-url="([^"]*)"/)?.[1];
  const title = attributes.match(/data-title="([^"]*)"/)?.[1];

  if (!url || !title) {
    return null;
  }

  return {
    url: decodeHTMLEntities(url),
    title: decodeHTMLEntities(title),
    image: attributes.match(/data-image="([^"]*)"/)?.[1],
    price: attributes.match(/data-price="([^"]*)"/)?.[1],
    description: decodeHTMLEntities(attributes.match(/data-description="([^"]*)"/)?.[1] || ''),
    seller: attributes.match(/data-seller="([^"]*)"/)?.[1],
  };
}

function decodeHTMLEntities(text: string): string {
  if (!text) return '';
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * Generate HTML for a product card
 */
function generateProductCardHTML(product: ProductData): string {
  const imageHTML = product.image
    ? `
    <div class="product-card-image">
      <img src="${product.image}" alt="${product.title}" loading="lazy" />
    </div>
  `
    : '';

  const priceHTML = product.price
    ? `<p class="product-card-price">${product.price}</p>`
    : '';

  const descriptionHTML = product.description
    ? `<p class="product-card-description">${product.description}</p>`
    : '';

  const sellerHTML = product.seller
    ? `<p class="product-card-seller">${product.seller}</p>`
    : '';

  return `
    <div class="product-card not-prose">
      ${imageHTML}
      <div class="product-card-content">
        <div class="product-card-header">
          <h4 class="product-card-title">${product.title}</h4>
          <span class="product-card-badge">PR</span>
        </div>
        ${descriptionHTML}
        <div class="product-card-footer">
          <div class="product-card-pricing">
            ${priceHTML}
            ${sellerHTML}
          </div>
          <a href="${product.url}" target="_blank" rel="noopener noreferrer sponsored" class="product-card-button">
            詳細を見る
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  `;
}

/**
 * Transform product card placeholders in HTML content to styled product cards
 */
export function transformProductCards(html: string): string {
  // Match <div data-product ...>...</div> or self-closing <div data-product ... />
  const productPattern = /<div\s+([^>]*data-product[^>]*)>(?:<\/div>)?/gi;

  return html.replace(productPattern, (match, attributes) => {
    const product = parseProductData(attributes);
    if (!product) {
      return match; // Return original if parsing fails
    }
    return generateProductCardHTML(product);
  });
}
