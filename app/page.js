"use client";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Grid, Rating, Skeleton } from "@mui/material";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products/");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching posts:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={400}
        bgcolor={"#fff"}
      >
        <Grid container spacing={4}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((skeletonId) => (
            <Grid item xs={12} sm={6} md={3} key={skeletonId}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" height={40} />
                  <Skeleton variant="text" height={20} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box bgcolor={"#fff"}>
      <Box
        width="100%"
        position="fixed"
        top={0}
        zIndex={1}
        bgcolor={"#fff"}
        boxShadow={1}
        py={2}
        textAlign="center"
      >
        <Typography color={"teal"} variant="h4">
          Fetching The Data From fakestoreapi
        </Typography>
      </Box>
      
      <Grid
        container
        display={"grid"}
        gridTemplateColumns={{
          xs: "repeat(1,1fr)",
          sm: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(4,1fr)",
        }}
        justifyContent={"center"}
        bgcolor={"#fff"}
        alignItems={"center"}
        gap={4}
        p={4}
        width={"100%"}
        mt={8}
      >
        {posts.map((post) => (
          <Card key={post.id} padding={3}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={post.image}
                alt="Posts"
              />
              <CardContent>
                <Typography
                  color={"teal"}
                  noWrap={true}
                  fontSize={"17px"}
                  gutterBottom
                  component="div"
                >
                  {post.title}
                </Typography>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${post.price}
                  </Typography>
                  <Rating
                    name="half-rating"
                    defaultValue={post.rating.rate}
                    precision={0.5}
                  />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </Box>
  );
}
