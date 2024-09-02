import React from 'react';
import Card from './components/card';
import { createClient } from '@/client/supabase';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function Home() {
  const supabase = createClient();




  // Select the fields you want from the table
  const { data: products, error } = await supabase
    .from('easysell-products')
    .select('id, name, description, price, imageUrl');


  const { data: topProducts } = await supabase
    .from('easysell-products')
    .select('id, name, description, price, imageUrl')
    .is('boost', true);

  // Log the error for debugging purposes
  if (error) {
    console.error('Error fetching products:', error);
    return notFound();
  }

  // If products is null or not an array, return notFound
  if (!products || !Array.isArray(products)) {
    return notFound();
  }
  // If products is null or not an array, return notFound
  if (!topProducts || !Array.isArray(topProducts)) {
    return notFound();
  }

  return (
    <main className="min-h-screen max-w-[100rem] mx-auto">
      <div className="px-12 pt-12 pb-20">
        <div className="flex flex-col xl:flex-row gap-2 xl:gap-40">
          <div className="pt-12">
            <h2 className="text-4xl mb-16">OUR TOP PRODUCTS</h2>
            <p className="text-xl">You can pay to boost your products here.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"> {/* Adjusted gap */}
            {topProducts &&
              topProducts.map((topProduct, idx) => (
                <Card
                  key={`${topProduct.name}-${idx}`}
                  {...topProduct}
                /* imageUrl={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/storage/${topProduct.imageUrl}`} */
                />
              ))}
          </div>
        </div>


        <h2 className="text-4xl mt-20 mb-12">ALL PRODUCTS</h2>
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((item, idx) => (
              <Card key={`${item.name}-${idx}`} {...item} />
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-800">All our products are gone...</p>
        )}
      </div>


    </main >
  );
}
