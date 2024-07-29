import { Dropzone } from "@/components/dropzone";

const Home = () => {
  return (
    <main className='flex min-h-dvh w-full flex-col items-center justify-center gap-y-4 bg-neutral-300 p-4'>
      <section className='flex max-w-2xl flex-col items-center gap-y-4'>
        <h1 className='text-balance text-3xl font-bold tracking-tighter'>
          Análisis de campaña influencer
        </h1>
        <p className='text-pretty text-center text-sm'>
          Sube tu video y descubre el engagement de tu audiencia.
        </p>

        <Dropzone />
      </section>
    </main>
  );
};
export default Home;
