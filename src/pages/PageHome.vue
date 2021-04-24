<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div
        class="q-py-lg q-px-md row items-end
    q-col-gutter-md"
      >
        <div class="col">
          <q-input
            v-model="newCreetContent"
            class="new-creet"
            placeholder="What's Happening?"
            maxlength="280"
            bottom-slots
            counter
            autogrow
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img
                  src="https://secure.gravatar.com/avatar/94d6effa8f5555998190061f5ab527ec"
                />
              </q-avatar>
            </template>
          </q-input>
        </div>

        <div class="col col-shrink">
          <q-btn
            @click="addNewCreet"
            :disable="!newCreetContent"
            class="q-mb-lg"
            unelevated
            rounded
            color="primary"
            label="Bark"
            no-caps
          />
        </div>
      </div>

      <q-separator size="10px" color="grey-2" class="divider" />

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item v-for="creet in creets" :key="creet.id" class="creet q-py-md">
            <q-item-section avatar top>
              <q-avatar>
                <img
                  src="https://secure.gravatar.com/avatar/94d6effa8f5555998190061f5ab527ec"
                />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong> Eduardo Ramirez</strong>
                <span class="text-grey-7">
                  @eds314
                  <br class="lt-md" />&bull; {{ creet.date | relativeDate }}
                </span>
              </q-item-label>
              <q-item-label class="creet-content text-body1">
                {{ creet.content }}
              </q-item-label>
              <div class="creet-icons row justify-between q-mt-sm">
                <q-btn
                  flat
                  round
                  color="grey"
                  icon="far fa-comment"
                  size="sm"
                /> 
                <q-btn
                  flat
                  round
                  color="grey"
                  icon="fas fa-retweet"
                  size="sm"
                />
                
                <q-btn 
                @click="toggleLiked(creet)"
                :color="creet.liked ? 'pink' : 'grey'"
                :icon="creet.liked ? 'fas fa-heart' : 'far fa-heart'"
                size="sm"
                flat
                round
                />

                <q-btn
                  @click="deleteCreet(creet)"
                  flat
                  round
                  color="grey"
                  icon="fas fa-trash"
                  size="sm"
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from "src/boot/firebase";

import { formatDistance } from "date-fns";

export default {
  name: "PageHome",
  data() {
    return {
      newCreetContent: "",
      creets: [
        //  {
        //    id: "ID1",
        //    content: "Keep at it.",
        //    date: 1619121649420,
        //    liked: false
        //  },
        //  {
        //    id: "ID2",
        //    content: "Lorem ipsum dolor sit amet.",
        //    date: 1619121708010,
        //    liked: true
        //  },
      ]
    }
  },
  methods: {
    addNewCreet() {
      let newCreet = {
        content: this.newCreetContent,
        date: Date.now(),
        liked: false
      }
      //this.creets.unshift(newCreet)
      db.collection("creets")
        .add(newCreet)
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id)
        })
        .catch(error => {
          console.error("Error adding document: ", error)
        })
      this.newCreetContent = "";
    },
    deleteCreet(creet) {
      db.collection("creets").doc(creet.id).delete().then(() => {
          console.log("Document successfully deleted!")
        }).catch(error => {
          console.error("Error removing document: ", error)
        })
    },
    toggleLiked(creet){
       db.collection("creets").doc(creet.id).update({
          liked: !creet.liked
        })
      .then(() => {
        console.log("Document successfully updated!")
      })
      .catch((error) => {
    // The document probably doesn't exist.
        console.error("Error updating document: ", error)
      })
    }
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date());
    }
  },
  mounted() {
    db.collection("creets").orderBy("date").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          let creetChange = change.doc.data()
          creetChange.id = change.doc.id
          if (change.type === "added") {
            console.log("New creet: ", creetChange)
            this.creets.unshift(creetChange)
          }
          if (change.type === "modified") {
            console.log("Modified creet: ", creetChange)
            let index = this.creets.findIndex(creet => creet.id === creetChange.id)
            Object.assign(this.creets[index], creetChange)
          }
          if (change.type === "removed") {
            console.log("Removed creet: ", creetChange)
            let index = this.creets.findIndex(
              creet => creet.id === creetChange.id
            )
            this.creets.splice(index, 1)
          }
        })
      })
  }
}
</script>

<style lang="sass">
.new-creet
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.creet-content
  white-space: pre-line
.creet-icons
  margin-left: -5px
.creet:not(:first-child)
  border-top: 1px solid rgba(0,0,0, 0.12)
</style>
