Start app by running `npm start` or `nodemon` in root directory.

# API Routes

## Offers

### GET: /offers
Get all Offertes

### GET: /offers/populated
Get all Offertes; references to other models will be populated

### GET: /offers/:id
Get one Offerte by ID

### GET: /offers/:id/populated
Get one offerte by ID; references to other models will be populated

### POST: /offers
Add new Offerte

### PUT: /offers/:id
Update Offerte by ID

### DELETE: /offers/:id
Delete Offerte by ID

### GET: /offers/:id/categories
Get all Categories of Offer by ID

### GET: /offers/:id/categories/productgroups
Get all ProductGroups of all Categories of Offer by ID

### GET: /offers/:id/categories/productgroups/products
Get all Products of all ProductGroups of all Categories of Offer by ID


## Categories

### GET: /categories
Get all Categories

### GET: /categories/populated
Get all Categories; references to other models will be populated

### GET: /categories/:id
Get one Category by ID

### GET: /categories/:id/populated
Get one Category by ID; references to other models will be populated

### POST: /categories
Add new Category

### PUT: /categories/:id
Update Category by ID

### DELETE: /categories/:id
Delete Category by ID

### GET: /categories/:id/productgroups
Get all ProductGroups of Category by ID

### GET: /categories/:id/productgroups/products
Get all Products of all ProductGroups of Category by ID


## ProductGroups

### GET: /productgroups
Get all ProductGroups

### GET: /productgroups/populated
Get all ProductGroups; references to other models will be populated

### GET: /productgroups/:id
Get one ProductGroup by ID

### GET: /productgroups/:id/populated
Get one ProductGroup by ID; references to other models will be populated

### POST: /productgroups
Add new ProductGroup

### PUT: /productgroups/:id
Update ProductGroup by ID

### DELETE: /productgroups/:id
Delete ProductGroup by ID

### GET: /productgroups/:id/products
Get all Products of ProductGroup by ID


## Product

### GET: /products
Get all Products

### GET: /products/:id
Get one Product by ID

### POST: /products
Add new Product

### PUT: /products/:id
Update Product by ID

### DELETE: /products/:id
Delete Product by ID

## Demo

### GET: /demo
Fill database with Demo data

### DELETE: /demo
Completely erase entire database


# Models

Since the models are pretty straightforward, they are only explained globally.

## Global explanation
The Offer model is at the root, this model contains basic information who the Offer is for, what the address is, etc.
Every Offer has one or more Categories. A Category is a model which only contains a name, and one or more ProductGroups. 
The same is true for ProductGroups, it only contains a name and one or more Products.
Every Product contains information about the... yes, well, the Product! 