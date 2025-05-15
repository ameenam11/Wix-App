import React, { useEffect, useState } from "react";
import {
  WixDesignSystemProvider,
  Card,
  Text,
  Box,
  EmptyState,
  TextButton,
  Image,
  Loader,
  Button,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import { products } from "@wix/stores";
import { dashboard } from "@wix/dashboard";

const fetchMostExpensiveProduct = async () => {
  try {
    const result = await products.queryProducts().find();
    if (!result.items.length) return null;
    return result.items.reduce((prev, curr) =>
      (curr.priceData?.price ?? 0) > (prev.priceData?.price ?? 0) ? curr : prev
    );
  } catch (e) {
    return null;
  }
};

const Plugin: React.FC = () => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMostExpensiveProduct().then((p) => {
      setProduct(p);
      setLoading(false);
    });
  }, []);

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Card>
        <Card.Header
          title="Most expensive product"
        />
        <Card.Divider />
        <Card.Content size="medium">
          {loading ? (
            <Loader size="small" />
          ) : product ? (
            <Box direction="horizontal" gap="SP2">
              {product.media?.mainMedia?.image?.url && (
                <Image
                  src={product.media.mainMedia.image.url}
                  width={150}
                  height={150}
                  style={{ borderRadius: 8 }}
                />
              )}
              <Box direction="vertical" gap="SP3">
                <Text weight="bold">{product.name + ": "}  {product.priceData?.price ?? 0}$</Text>
                <Button
                  onClick={() => {
                    dashboard.navigate(
                      { pageId: "c63b4d42-33a3-404e-ace1-86f9fbbe306e" },
                      { displayMode: "main" }
                    );
                  }}
                >
                  Go to Discount Page
                </Button>
              </Box>
            </Box>
          ) : (
            <EmptyState
              theme="section"
              title="No products found"
              subtitle="There are no products in your store."
            />
          )}
        </Card.Content>
      </Card>
    </WixDesignSystemProvider>
  );
};

export default Plugin;
