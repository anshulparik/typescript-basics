import { z } from "zod";

const url: string = "https://www.course-api.com/react-tours-project";

const tourSchema = z.object({
  id: z.string(),
  name: z.string(),
  info: z.string(),
  image: z.string(),
  price: z.string(),
  something: z.string(),
});

// interface Tour {
//   id: string;
//   name: string;
//   info: string;
//   image: string;
//   price: string;
// }

type Tour = z.infer<typeof tourSchema>

const fetchData = async (url: string): Promise<Tour[]> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error! status: ${response?.status}`);
    }

    // const data: Tour[] = await response.json();
    // console.log(data, "=== data");

    const rawData: Tour[] = await response.json();
    const result = tourSchema.array().safeParse(rawData);
    if(!result.success){
        throw new Error(`Invalid data: ${result.error}`);
    }
    
    return result?.data;
  } catch (error) {
    const errMsg =
      error instanceof Error ? error?.message : "Something went wrong!";
    console.log(errMsg, "=== error");
    return [];
  }
};

const tours = await fetchData(url);

tours?.map((tour) => {
  console.log(tour);
});

/*
NOTE: Here, tours is type of any. In tours we are not able to predict the type.
When we use typescript we need to provide the shape of our data.

What if we provide the incorrect shape, does typescript is going to detect its on its own: NO
To overcome this we use ZOD library.
*/
