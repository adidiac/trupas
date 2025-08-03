import React from 'react';

type Props = {
  title: string;
  description: string;
  price: string;
};

export default function OfferCard({ title, description, price }: Props) {
  return (
    <div className="offer-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <p><strong>{price}</strong></p>
    </div>
  );
}
