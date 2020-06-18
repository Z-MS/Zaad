<template>
  <div class="grid">
      <div class="item one"><note-list/></div>
      <div class="item"><todo-list/></div>
      <div class="item">3</div>
  </div>
</template>

<script>
import NoteList from './Notes/NoteList'
import TodoList from './Todo/TodoList'

export default {
    components: {
        NoteList,
        TodoList
    }
    /* 
    
    [
        {
            name: "Proj1",
            description: "Project manager",
            notes: "notes",
            completionLevel: percentage(gotten from number of completed tasks),
            completionStatus: Boolean(should),
            dates: {
                startDate: 77,
                expCompletionDate: 99
            },
            images: optional,
            tasks: [
                {
                    taskText: "dk",
                    completionLevel,
                    completionStatus,
                    dateCreated
                }
            ]
        }
    ]
    Tasks component(should have the store)
    subtask component should emit edited and completed events to Tasks, which will in turn commit the data to the store
     */
}
</script>

<style scoped>
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 10px;
    }

    .item {
        display: grid;
        justify-content: center;
        background-color: chartreuse;
        
    }

    .one {
        grid-column: span 2
    }
</style>