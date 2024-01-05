/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unknown-property */
import React, { Fragment, useState, useEffect } from 'react';
import { getErrorMessage } from '../utils/utilFunctions';
import host from '@/utils/host';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PreOrderForm = ({ merch }: any) => {
  const merch_id = merch.id;
  const [user_id, setUserID] = useState<number | string>('');
  const [shipping_province, setShippingProvince] = useState('');
  const [shipping_city, setShippingCity] = useState('');
  const [shipping_street, setShippingStreet] = useState('');
  const [shipping_house_number, setShippingHouseNumber] = useState('');
  // const [image, setImage] = useState<File | null>(null);
  const [merch_quantity, setMerchQuantity] = useState<number | string>('');
  const date_time_submitted = new Date();

  const getAllPreOrders = async () => {
    try {
      const response = await fetch(`${host}/pre-order-form`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const jsonData = await response.json();
      const userId = jsonData.userId;

      setUserID(userId);
    } catch (err) {
      console.error(getErrorMessage(err));
    }
  };

  useEffect(
    () => {
      getAllPreOrders();
    },
    [] /* bracket ensures useEffect does not repeatedly request multiple times */
  );

  const preOrderMerch = async (event: any) => {
    event.preventDefault();

    // if (!image) {
    //   return;
    // }

    // const formData = new FormData();
    // formData.append('user_id', user_id.toString());
    // formData.append('shipping_provice', shipping_province);
    // formData.append('shipping_city', shipping_city);
    // formData.append('shipping_street', shipping_street);
    // formData.append('shipping_house_number', shipping_house_number);
    // formData.append('merch_id', merch_id.toString());
    // formData.append('image', image);
    // formData.append('merch_quantity', merch_quantity.toString());
    // formData.append('date_time_submitted', date_time_submitted.toString());

    try {
      const body = {
        user_id,
        shipping_province,
        shipping_city,
        shipping_street,
        shipping_house_number,
        merch_id,
        // image,
        merch_quantity,
        date_time_submitted,
      };
      const preOrderUpload = await fetch(`${host}/pre-order-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body),
      });
      const jsonData = await preOrderUpload.json();
      // const userId = jsonData.userId;

      console.log('Form uploaded successfully', jsonData);

      // window.location.href = '/merch';
    } catch (err) {
      console.error('Error uploading image', err);
      console.error(getErrorMessage(err));
    }
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   setImage(file || null);
  // };

  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">Pre-Order</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Pre-Order Details</DialogTitle>
            <DialogDescription>
              Please provide the your Shipping Address and the additional
              details to pre-order this item.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shipping_province" className="text-right">
                Province
              </Label>
              <Input
                id="shipping_province"
                className="col-span-3"
                onChange={(e) => setShippingProvince(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shipping_City" className="text-right">
                City
              </Label>
              <Input
                id="shipping_City"
                className="col-span-3"
                onChange={(e) => setShippingCity(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shipping_street" className="text-right">
                Street
              </Label>
              <Input
                id="shipping_street"
                className="col-span-3"
                onChange={(e) => setShippingStreet(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shipping_house_number" className="text-right">
                House Number
              </Label>
              <Input
                id="shipping_house_number"
                className="col-span-3"
                onChange={(e) => setShippingHouseNumber(e.target.value)}
              />
            </div>
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gcash_receipt" className="text-right">
                GCash Receipt
              </Label>
              <Input 
                id="gcash_receipt"
                type="file"
                accept="image/png, image/jpeg"
                className="col-span-3" 
                onChange={handleImageChange}
              />
            </div> */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="merch_quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="merch_quantity"
                type="number"
                className="col-span-3"
                onChange={(e) => setMerchQuantity(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={preOrderMerch}>
              Confirm Pre-Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default PreOrderForm;
