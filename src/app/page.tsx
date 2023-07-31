import {DragAndDrop} from '@/components/dragAndDrop';

export default function Home() {
// bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600
  return (
      <main
          className="flex min-h-screen flex-col items-center justify-between p-24">
        <DragAndDrop/>

      </main>
  )
      ;
}
