<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;
use App\Http\Requests\CreateCustomerRequest;

class CustomerController extends Controller
{
    public function all(){
        $customers=Customer::all();
        return response()->json([
            "customers"=>$customers
        ],200);

    }

    public function get($id){
        $customer=Customer::whereId($id)->first();
        return response()->json([
            "customer"=>$customer
        ],200);

    }
    public function new(CreateCustomerRequest $request){
        $customer=new Customer();
        $customer->name=$request->name;
        $customer->email=$request->email;
        $customer->website=$request->website;
        $customer->phone=$request->phone;
        if($customer->save()){
            return response()->json([
                "customer"=>$customer
            ],200);
        }

    }
}
