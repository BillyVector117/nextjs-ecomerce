import bcrypt from 'bcrypt'
export const data = {
    users: [
        {
            name: 'User',
            email: 'user@live.com',
            password: bcrypt.hashSync('123', 10),
            isAdmin: true
        },
        {
            name: 'User 1',
            email: 'user1@live.com',
            password: bcrypt.hashSync('123', 10),
            isAdmin: false
        }
    ],
    products: [
        {
            name: 'Numskull Official Resident Evil RPD Sunglasses',
            category: 'Accessories',
            image: '/images/1.jpg',
            price: 585,
            brand: 'Numskull',
            rating: 4.5,
            numReviews: 12,
            countInStock: 89,
            description: 'Sun coming into your eyes as you sabotage the evil plans of the Umbrella Corporation? As a member of the Raccoon Police Department, you have to get the right gear to go along with your status! These sunglasses are not only stylish, but also made of the highest quality materials, which means that they can withstand the blow of any hungry zombie.'
        },
        {
            name: 'Resident Evil Lady Dimitrescu - Vampire Pearl Pendant Necklace',
            category: 'Accessories',
            image: '/images/2.jpg',
            price: 558,
            brand: 'SaikouCos',
            rating: 4,
            numReviews: 800,
            countInStock: 44,
            description: "Finishing: During the design process, our designers modify their drafts many times, trying to inject the creative idea and spirit into the image of the ring. We strictly follow the plans and technology required in each product process. The details are made by hand. We design the ring part as open type, you can adjust the dimension from different finger sizes. After finishing the product process, we check each ring carefully to make sure our product has high quality and better texture."
        },
        {
            name: 'JINPAI Resident Evil Biochemical 6 Ambrera Theme Umbrella Protection Umime Anime Umbrella Paraguas Plegable Triple',
            category: 'Accessories',
            image: '/images/3.jpg',
            price: 585,
            brand: 'JINPAI',
            rating: 5,
            numReviews: 74,
            countInStock: 22,
            description: "Product name: umbrella Product size : umbrella diameter: 98cm Product material: impact cloth. Product color: black Product style: three times umbrella Open mode: manual Product gross weight: 0.4kg Applicable scene: outdoor Delivery time is 15-20 days and return time is 30 days. If you cannot receive your order within 30 days, please contact us."
        },
        {
            name: 'New Resident Evil Bag Shoulder Bag Anime Game Protection Umbrella Virus Hive Messenger Bag',
            category: 'Messenger Bags',
            image: '/images/4.jpg',
            price: 588,
            brand: 'Empty',
            rating: 5,
            numReviews: 84,
            countInStock: 12,
            description: 'New Resident Evil Bag Shoulder Bag Anime Game Protection Umbrella Virus Hive Messenger Bag'
        },
        {
            name: 'Nerd Block NBK-RESTAR-C Resident Evil S.T.A.R.S. Diecast Badge Replica',
            category: 'Accessories',
            image: '/images/5.jpg',
            price: 499,
            brand: 'Nerd Block',
            rating: 0,
            numReviews: 84,
            countInStock: 89,
            description: 'Celebrate the 20th Anniversary of Resident Evil with this S.T.A.R.S. Diecast Badge Replica! Made of real metal, this weighty replica looks just like the badge worn by the Special Tactics And Rescue Service (S.T.A.R.S.), the elite Special Forces division of the Raccoon City Police Department! A Nerd Block exclusive.'
        },
        {
            name: 'Numskull Official Resident Evil RPD Sunglasses',
            category: 'Accessories',
            image: '/images/1.jpg',
            price: 585,
            brand: 'Numskull',
            rating: 4.5,
            numReviews: 12,
            countInStock: 89,
            description: 'Sun coming into your eyes as you sabotage the evil plans of the Umbrella Corporation? As a member of the Raccoon Police Department, you have to get the right gear to go along with your status! These sunglasses are not only stylish, but also made of the highest quality materials, which means that they can withstand the blow of any hungry zombie.'
        },
        {
            name: 'Numskull Official Resident Evil 3 S.T.A.R.S. Snapback',
            category: 'Accessories',
            image: 'https://m.media-amazon.com/images/I/51lm+8NovFL._AC_SL1000_.jpg',
            price: 417,
            brand: 'Numskull',
            rating: 3,
            numReviews: 0,
            countInStock: 0,
            description: 'Not everything is fun and games being a police officer in Raccoon City, especially after the infamous incident that occurred, but that doesn`t mean you should be stripped of your police duties! This snapback is inspired by the Raccoon City Police Department uniform, with a premium 3D embroidery of their logo on the front, making it the ideal item for any Resident Evil fan.'
        }
    ]
}