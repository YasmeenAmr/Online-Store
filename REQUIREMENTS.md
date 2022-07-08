# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

# Users
. Create ('/user')[POST]
. Update ('/user/:id')[Patch]
. Index  ('/user')[GET]
. Show   ('/user/:id')[GET]
. Delete ('/user/:id')[DELETE]


# Products
. Create ('/product')[POST]
. Update ('/product/:id')[Patch]
. Index  ('/product')[GET]
. Show   ('/product/:id')[GET]
. Delete ('/product/:id')[DELETE]

# Orders
. Create ('/order')[POST]
. Update ('/order/:id')[Patch]
. Index  ('/order')[GET]
. Show   ('/order/:id')[GET]
. Delete ('/order/:id')[DELETE]
. Add product ('/order/:id/product')[POST]


## Data Shape

# Users 
. id
. first_name
. last_name
. password

# Products 
. id
. product_name
. price

# Orders 
. id 
. status
. user_id (fk)