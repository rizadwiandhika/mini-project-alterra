import React, { useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BookmarkIcon, UserCircleIcon } from '@heroicons/react/outline'
import withOverlay from '../hoc/withAuthOverlay'
import Navbar from '../components/Navbar'
import ArticleCard from '../components/Article/ArticleCard'
import LabelRounded from '../components/UI/LabelRounded'
import Search from '../containers/Navbar/Search'

function Home(props) {
  const user = useSelector((state) => state.user)
  const isAuth = user.username && user.password

  function handleClickSignIn() {
    props.openOverlayLogin()
    props.setLoginCallback()
    props.setRegisterCallback()
  }

  function handleClickGetStarted(e) {
    props.openOverlayRegister()
    props.setLoginCallback()
    props.setRegisterCallback()
  }

  function handleClickStartWriting() {
    if (isAuth) return props.history.push('/create-article')

    function callback(err) {
      if (err) return
      props.history.push('/create-article')
    }

    props.openOverlayLogin()
    props.setLoginCallback(callback)
    props.setRegisterCallback(callback)
  }

  return (
    <>
      <Navbar shadow>
        <Search />
        {isAuth ? (
          <>
            <NavLink to="/profile/reading-list">
              <BookmarkIcon
                width={24}
                className="hover:cursor-pointer text-gray-500"
              />
            </NavLink>
            <UserCircleIcon
              width={24}
              className="hover:cursor-pointer text-gray-500"
            />
          </>
        ) : (
          <>
            <p
              onClick={handleClickSignIn}
              className="hover:cursor-pointer ml-4 text-sm"
            >
              Sign In
            </p>
            <div className="text-sm">
              <LabelRounded
                onClick={handleClickGetStarted}
                theme="blue"
                text="Get started"
              />
            </div>
          </>
        )}
      </Navbar>

      <div className="w-11/12 max-w-screen-xl mx-auto md:grid md:grid-cols-12">
        <div className="md:col-span-8 ">
          <div className="mt-12 ">
            <div className="flex gap-6 border-b border-gray-300">
              <p className="pb-2 border-b border-none text-sm">TODAY</p>
              <p className="pb-2 border-b border-black text-sm font-bold">
                RECOMMENDED ARTICLES
              </p>
            </div>
            <div className="mt-12">
              <ArticleCard className="mt-12" />
              <ArticleCard className="mt-12" />
              <ArticleCard className="mt-12" />
              <ArticleCard className="mt-12" />
              <ArticleCard className="mt-12" />
              <ArticleCard className="mt-12" />
            </div>
          </div>
        </div>
        <div className="hidden mx-auto border-l border-gray-300 w-0 md:block md:col-span-1" />
        <div className="hidden md:block md:col-span-3">
          <div className="mt-12 sticky top-0 w-full">
            <p className="pb-2 font-bold ">Recommended topics</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <LabelRounded theme="gray" text="Programming" />
              <LabelRounded theme="gray" text="TV" />
              <LabelRounded theme="gray" text="Book" />
              <LabelRounded theme="gray" text="Guitar" />
              <LabelRounded theme="gray" text="Self" />
              <LabelRounded theme="gray" text="Mindfulness" />
              <LabelRounded theme="gray" text="Lifestyle" />
              <LabelRounded theme="gray" text="React JS" />
            </div>

            <div className="mt-12">
              <p className="pb-2 font-bold ">WRITE AN ARTICLE</p>
              <p className="pb-2 text-sm ">
                You can start share article to million readres
              </p>
              <div className="mt-4 min-w-max w-12 mx-auto">
                <LabelRounded
                  onClick={handleClickStartWriting}
                  py={2}
                  px={8}
                  theme="blue"
                  text="Start Writing"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withOverlay(Home)
