/*
 Copyright 2017 Google Inc.

 Licensed under the Apache License, Version 2.0 (the 'License');
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an 'AS IS' BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
/**
 * @file
 * ValidatePostRequest.js
 * Validate Get request resource with the confid provided
 */
var PostResourceConfig =
    {
        'Headers': [
            {'Authorization': {'Mandatory': true}},
            {'x-fapi-financial-id': {'Mandatory': true}},
            {'x-idempotency-key': {'Mandatory': true}},
            {'x-jws-signature': {'Mandatory': true}},
            {'Content-Type': {'Mandatory': true, 'ValueList': ['application/json']}}
        ],
        'Body': [
            {'Data': {'Mandatory': true, 'ValueType': 'Object'}},
            {'Data.Initiation': {'Mandatory': true, 'ValueType': 'Object'}},
            {'Data.Initiation.EndToEndIdentification': {'Mandatory': true, 'MaxText': 35}},
            {'Data.Initiation.InstructionIdentification': {'Mandatory': true, 'MaxText': 35}},
            {'Data.Initiation.LocalInstrument': {'MaxText': 35}},
            {'Data.Initiation.InstructedAmount': {'Mandatory': true, 'ValueType': 'Object'}},
            {'Data.Initiation.InstructedAmount.Amount': {'Mandatory': true, 'ValueType': 'Float', 'MaxText':14}},
            {'Data.Initiation.InstructedAmount.Currency': {'Mandatory': true, 'MaxText': 3, 'MinText': 3}},
            {'Data.Initiation.CreditorAccount': {'Mandatory': true, 'ValueType': 'Object'}},
            {'Data.Initiation.CreditorAccount.SchemeName': {'Mandatory': true, 'MaxText':40}},
            {'Data.Initiation.CreditorAccount.Identification': {'Mandatory': true, 'MaxText': 256}},
            {'Data.Initiation.CreditorAccount.Name': {'Mandatory': true, 'MaxText': 70}},
            {'Data.Initiation.CreditorAccount.SecondaryIdentification': { 'MaxText': 34}},
            {'Data.Initiation.DebtorAccount': {'Mandatory': false, 'ValueType': 'Object'}},
            {'Data.Initiation.DebtorAccount.SchemeName': {'Mandatory': true, 'MaxText': 40}},
            {'Data.Initiation.DebtorAccount.Identification': {'Mandatory': true, 'MaxText': 256}},
            {'Data.Initiation.DebtorAccount.Name': {'Mandatory': false, 'MaxText': 70}},
            {'Data.Initiation.DebtorAccount.SecondaryIdentification': { 'MaxText': 34}},
            {'Data.Initiation.CreditorPostalAddress':{'ValueType':'Object'}},
            {'Data.Initiation.CreditorPostalAddress.AddressType': {'ValueList': ['Business',
                                                                                'Correspondence',
                                                                                'DeliveryTo',
                                                                                'MailTo',
                                                                                'POBox',
                                                                                'Postal',
                                                                                'Residential',
                                                                                'Statement']}},
            {'Data.Initiation.CreditorPostalAddress.Department': {'MaxText': 70}},
            {'Data.Initiation.CreditorPostalAddress.StreetName': {'MaxText': 70}},
            {'Data.Initiation.CreditorPostalAddress.SubDepartment': {'MaxText': 70}},
            {'Data.Initiation.CreditorPostalAddress.BuildingNumber': {'MaxText': 15}},
            {'Data.Initiation.CreditorPostalAddress.PostCode': {'MaxText': 16}},
            {'Data.Initiation.CreditorPostalAddress.TownName': {'MaxText': 35}},
            {'Data.Initiation.CreditorPostalAddress.CountrySubDivision': {'MaxText': 35}},
            {'Data.Initiation.CreditorPostalAddress.Country': {'MaxText': 2, 'MinText': 2}},
            {'Data.Initiation.CreditorPostalAddress.AddressLine': {'ValueType': 'Array'}},
            {'Data.Initiation.RemittanceInformation': {'ValueType': 'Object'}},
            {'Data.Initiation.RemittanceInformation.Reference': { 'MaxText':35}},
            {'Data.Initiation.RemittanceInformation.Unstructured': { 'MaxText':140}},
            {'Data.Authorisation' : {'ValueType': 'Object'}},
            {'Data.Authorisation.AuthorisationType' : {'Mandatory': true, 'ValueList':['Any','Single']}},
            {'Data.Authorisation.CompletionDateTime' : {'ValueType': 'Date'}},
            {'Risk': {'Mandatory': true, 'ValueType': 'Object'}},
            {'Risk.PaymentContextCode': {'ValueList': ['BillPayment',
                                                        'EcommerceGoods',
                                                        'EcommerceServices',
                                                        'Other',
                                                        'PartyToParty'
                                                       ]}},
            {'Risk.MerchantCategoryCode': {'MinText':3, 'MaxText': 4},
            {'Risk.MerchantCustomerIdentification': {'MaxText': 70},
            {'Risk.DeliveryAddress.AddressLine': {'ValueType': 'Array'},
            {'Risk.DeliveryAddress.StreetName': {'MaxText': 70},
            {'Risk.DeliveryAddress.BuildingNumber': {'MaxText': 16  },
            {'Risk.DeliveryAddress.PostCode': {'MaxText': 16},
            {'Risk.DeliveryAddress.TownName': {'Mandatory':true, 'MaxText': 35},  
            {'Risk.DeliveryAddress.CountrySubDivision': {'MaxText': 35},  
            {'Risk.DeliveryAddress.Country': {'Mandatory':true, 'MaxText': 2, 'MinText':2},                                                       
        ]
    };
var error = validateRequest(PostResourceConfig);
if (error.isError) {
    context.setVariable('isError', error.isError);
    context.setVariable('obieCode',error.obieCode);
    context.setVariable('errorResponseCode', error.errorResponseCode);
    context.setVariable('errorDescription', error.errorDescription);
} else {
    context.setVariable('isError', false);
}
