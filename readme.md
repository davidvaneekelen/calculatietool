Start app by running `npm start` or `nodemon` in root directory.

# API Routes

## Offerte

### GET: /offertes
Get all Offertes

### GET: /offertes/populated
Get all Offertes; references to other models will be populated

### GET: /offertes/:id
Get one Offerte by ID

### GET: /offertes/:id/populated
Get one offerte by ID; references to other models will be populated

### POST: /offertes
Add new Offerte

### PUT: /offertes/:id
Update Offerte by ID

### DELETE: /offertes/:id
Delete Offerte by ID


## HoofdCategorie

### GET: /hoofdcategorieen
Get all HoofdCategorieen

### GET: /hoofdcategorieen/populated
Get all HoofdCategorieen; references to other models will be populated

### GET: /hoofdcategorieen/:id
Get one HoofdCategorie by ID

### GET: /hoofdcategorieen/:id/populated
Get one HoofdCategorie by ID; references to other models will be populated

### POST: /hoofdcategorieen
Add new HoofdCategorie

### PUT: /hoofdcategorieen/:id
Update HoofdCategorie by ID

### DELETE: /hoofdcategorieen/:id
Delete HoofdCategorie by ID


## SubCategorie

### GET: /subcategorieen
Get all SubCategorieen

### GET: /subcategorieen/populated
Get all SubCategorieen; references to other models will be populated

### GET: /subcategorieen/:id
Get one SubCategorie by ID

### GET: /subcategorieen/:id/populated
Get one SubCategorie by ID; references to other models will be populated

### POST: /subcategorieen
Add new SubCategorie

### PUT: /subcategorieen/:id
Update SubCategorie by ID

### DELETE: /subcategorieen/:id
Delete SubCategorie by ID


## Product

### GET: /producten
Get all Producten

### GET: /producten/:id
Get one Product by ID

### POST: /producten
Add new Product

### PUT: /producten/:id
Update Product by ID

### DELETE: /producten/:id
Delete Product by ID


# Models

Since the models are pretty straightforward, they are only explained globally.

## Global explanation
The Offerte model is at the root, this model contains basic information who the Offerte is for, what the address is, etc.
Every Offerte has one or more HoofdCategorieën. A Hoofdcategorie is a model which only contains a name, and one or more SubCategorieën. 
The same is true for SubCategorieën, it only contains a name and one or more Producten.
Every Product contains information about the... yes, well, the Product! 