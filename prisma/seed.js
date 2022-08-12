const { prisma } = require('../backend/constats/config.js');
const seed = async () => {
  try {
    let ctgs = await prisma.expenseCategory.findMany();
    if (!ctgs.length) {
      console.log('CREATING THE CATEGORIES');
      await prisma.expenseCategory
        .createMany({
          data: [
            { name: 'Comida' },
            { name: 'Casa' },
            { name: 'Cuentas y pagos' },
            { name: 'Transporte' },
            { name: 'Ropa' },
            { name: 'Diversión' },
            { name: 'Otros gastos' },
          ],
          skipDuplicates: true,
        })
        .catch(() => {
          console.log('error seeding {prisma Client}');
        });
    }
  } catch {
    console.log('error seeding');
  }
};

seed();
