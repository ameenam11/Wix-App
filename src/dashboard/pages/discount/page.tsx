import React, { useEffect, useState } from 'react';
import { EmptyState, Page, WixDesignSystemProvider, Card, Text, Input, Button, Box } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { products } from '@wix/stores';

const fetchProducts = async () => {
  try {
    const result = await products.queryProducts().find();
    return result.items.map((p) => ({
      id: p._id,
      name: p.name,
      price: p.priceData?.price ?? 0,
      image: p.media?.mainMedia?.image?.url ?? '',
      discounted: (
        typeof p.priceData?.discountedPrice === 'number' &&
        typeof p.priceData?.price === 'number' &&
        p.priceData.discountedPrice < p.priceData.price
      ),
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const DashboardPage: React.FC = () => {
  const [product, setProduct] = useState<any>(null);
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const products = await fetchProducts();
      products.forEach((p: any) => {
        console.log(`Product: ${p.name}, discounted: ${p.discounted}, price: ${p.price}`);
      });
      const filtered = products.filter((p: any) => !p.discounted);
      if (filtered.length) {
        const mostExpensive = filtered.reduce((prev, curr) => (curr.price > prev.price ? curr : prev));
        setProduct(mostExpensive);
      }
      setLoading(false);
    };
    getProduct();
  }, []);

  const handleDiscount = async () => {
    setSuccess(true);
  };

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Page>
        <Page.Header
          title="Product Discounter"
          subtitle="Give people a discount on the most expensive product"
        />
        <Page.Content>
          {loading ? (
            <EmptyState theme="section" title="Loading..." />
          ) : product ? (
            <Card>
              <Box direction="vertical" gap="SP2">
                <Box direction="vertical" gap="SP1">
                  <Text weight="bold" skin="standard">
                  Most Expensive Product
                  </Text>
                  <Text size="medium" weight="thin" secondary>
                  Here you can apply a discount to the most expensive, non-discounted product in your store. 
                  </Text>
                </Box>
                {product?.description && (
                  <Text size="small" weight="normal" style={{ marginBottom: 8 }}>
                    {product.description}
                  </Text>
                )}
                <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0' }} />
                <Box direction="horizontal" gap="SP4" align="left">
                  {product?.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: 300, height: 300, objectFit: 'cover', borderRadius: 8 }}
                    />
                  )}
                  <Box direction="vertical" gap="SP2">
                    <Box direction="horizontal" gap="SP1">
                      <Text weight="bold" size="medium" as="span">
                        Product Name:
                      </Text>
                      <Text weight="thin" size="medium" as="span">
                        {product.name}
                      </Text>
                    </Box>
                    <Box direction="horizontal" gap="SP1">
                      <Text weight="bold" size="medium" as="span">
                        Price:
                      </Text>
                      <Text weight="thin" size="medium" as="span">
                        ${product.price}
                      </Text>
                    </Box>
                    <Input
                      placeholder="Enter discount %"
                      value={discount}
                      onChange={e => {
                        setDiscount(e.target.value);
                        setSuccess(false);
                      }}
                      type="number"
                      min={1}
                      max={100}
                      size="small"
                    />
                    <Button
                      onClick={handleDiscount}
                      disabled={
                      !discount ||
                      isNaN(Number(discount)) ||
                      Number(discount) < 1 ||
                      Number(discount) > 100
                      }
                    >
                      Apply Discount
                    </Button>
                    {Number(discount) > 100 && (
                      <Text skin="error">The discount % must be between 1 and 100</Text>
                    )}
                    {success && <Text skin="success">Discount applied!</Text>}
                    {success && discount && !isNaN(Number(discount)) && Number(discount) > 0 && Number(discount) <= 100 && (
                      <Box direction="horizontal" gap="SP1" align="center" marginTop="SP2">
                        <Text size="medium" style={{ textDecoration: 'line-through', color: '#b0b0b0' }}>
                          The price after the discount is: 
                        </Text>
                        <Text size="medium" weight="bold">
                          {Number(discount) === 100
                            ? '0$'
                            : `${(product.price * (1 - Number(discount) / 100)).toFixed(2)}$`}
                        </Text>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Card>
          ) : (
            <EmptyState
              theme="section"
              title="No eligible products"
              subtitle="All products are already discounted."
            />
          )}
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
};

export default DashboardPage;
