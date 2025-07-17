'use client'
import LoadingComponent from "@/CustomComponents/CommonComponents/LoadingComponent"
import { useGetBooks } from "@/hooks/books.hook"
export interface Book {
  _id: string;
  bookName: string;
  authorName: string;
  category: string;
  description: string;
  photo: string;
  quantity: string;  // Consider changing to `number` if you plan to treat it numerically
  rating: string;    // Same here — consider `number` for numeric operations
}

const Books = ()=>{
    const {data:Books ,isLoading} = useGetBooks()
    if(isLoading && !Books){
        return (
            <LoadingComponent IsLoading />
        )
    }
    console.log(Books,'books')
    return (
        <div>
this is book page
        </div>
    )
}
export default Books