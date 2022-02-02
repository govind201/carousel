const Loading = (isLoading) => {
  return (
      <div class="loading">

      {isLoading ? <div>loading..</div>: ""}
      </div>
  )
}

export default Loading;