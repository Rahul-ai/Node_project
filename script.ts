const {PrismaClient} =  require('@prisma/client');
const prisma = new PrismaClient({ log : ["query"]})


async function main() {
    await prisma.post.deleteMany({});
    await prisma.user.deleteMany({});
    
    const user = await prisma.user.create({
        data:
        {   
            name:"Rahul",
            email:'rt878777@gmail.com',
            posts:
            {
                create:
                {
                    post:"Hello world",
                }
            },
        }
    });  
}

main()
.catch(e => { 
   console.error(e.message);
})
.finally(async ()=>{ 
    await prisma.$disconnect();
})
