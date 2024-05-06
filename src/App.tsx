import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'
import Form, { FormHandle } from './components/Form';
import { List } from './components/List';
import { IconButton } from './components/IconButton';
import { Card } from './components/Card';
import { ReactNode, useEffect, useRef, useState } from 'react';
import TimersContextProvider from './store/timers-context';
import AddTimer from './components/AddTimer.tsx';
import Header from './components/Header.tsx';
import Timers from './components/Timers.tsx';
import { get } from './util/http.ts'
import BlogPosts, { BlogPost } from './components/BlogPosts.tsx';
import fetchingImg from './assets/data-fetching.png'
import ErrorMessage from './components/ErrorMessage.tsx';

function HeartIcon() {
  return <span>❤️</span>;
}

function FrownIcon() {
  return <span>☹️</span>;
}

type RawBlogPostData = {
  id: number
  userId: number
  title: string
  body: string
}

function App() {
  const nameInput = useRef<HTMLInputElement>(null)
  const ageInput = useRef<HTMLInputElement>(null)
  const userForm = useRef<FormHandle>(null)
  const [isFetching, setIsFetching] = useState(true)
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true)
      try {
        const data = await get('https://jsonplaceholder.typicode.com/posts') as RawBlogPostData[]

        const blogPosts: BlogPost[] = data.map(rawPost => {
          return {
            id: rawPost.id,
            title: rawPost.title,
            text: rawPost.body
          }
        })
        setFetchedPosts(blogPosts)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        }
        // setError((error as Error).message)
        // setError("Failed to fetch posts!")
      }

      setIsFetching(false)
    }
    fetchPosts()
  }, [])

  let content: ReactNode

  if (error) {
    content = <ErrorMessage text={error} />
  }

  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />
  }

  if (isFetching) {
    content = <p id="loading-fallback">Fetching Posts...</p>
  }

  function handleSave(data: unknown) {
    // const extractedData = data as { name: string; age: string }
    if (
      !data ||
      typeof data !== 'object' ||
      !('name' in data) ||
      !('age' in data)
    ) {
        return;
    }

    console.log(data)
    userForm.current?.clear()
  }

  const users = [
    { id: 'u1', name: 'Max' },
    { id: 'u2', name: 'Manuel' },
  ];

  const hobbies = ['Sports', 'Reading', 'Cooking'];

  return (
    <TimersContextProvider>
    <main>
      <Form onSave={handleSave}>
        <Input id="name" label="Your Name" type="string" ref={nameInput}/>
        <Input id="age" label="Your Age" type="number" ref={ageInput}/>
        <Container as={Button}>Save</Container>
      </Form>
      <p>
        <Button href="https://google.com">A Link</Button>
      </p>
      <section>
        <h2>Users</h2>
        <List
          items={users}
          renderItem={(user) => <li key={user.id}>{user.name}</li>}
        />
      </section>
      <section>
        <h2>Hobbies</h2>
        <List
          items={hobbies}
          renderItem={(hobby) => <li key={hobby}>{hobby}</li>}
        />
      </section>
      <section>
        <Card
          title="My Card"
          actions={
            <Container as={Button} onClick={() => console.log('Button clicked!')}>
              Click Me!
            </Container>
          }
        >
        <p>
          <Input id="name" label="Your Name" type="string"/>
          <Input id="age" label="Your Age" type="number"/>
        </p>
      </Card>
      </section>
      <section>
        <IconButton icon={HeartIcon} onClick={() => console.log('Button clicked!')}>
          Like
        </IconButton>
        <IconButton icon={FrownIcon} onClick={() => console.log('Button clicked!')}>
          Dislike
        </IconButton>
      </section>
      <Header />
      <p>
        <AddTimer />
        <Timers />
      </p>
    </main>
    <main>
      <img src={fetchingImg} alt="An Abstract image depicting data fetching"/>
      {content}
    </main>
    </TimersContextProvider>
  )
}

export default App
