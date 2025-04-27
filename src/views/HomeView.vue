<template>
  <div class="graph-container">
    <div ref="container"></div>
    <div class="overlay">
      <h1>课程关系图 Course Relationship Graph</h1>
      <p>拖动旋转，滚轮缩放，右键平移 | Drag to rotate, scroll to zoom, right-click to pan</p>
      <div class="search-box">
        <input v-model="searchQuery" @keyup.enter="handleSearch" placeholder="搜索课程..." />
        <button @click="searchNode">搜索</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
// import * as TWEEN from '@tweenjs/tween.js'


export default {
  setup() {
    const container = ref(null)
    const loading = ref(true)
    const searchQuery = ref('')
    let scene, camera, renderer, labelRenderer, controls, nodes = [], edges = []
    // const nodeObjects = [] 

    const courseData = {
      nodes: [
      { id: 1, label: '数学分析' },
        { id: 2, label: '并行计算' },
        { id: 3, label: '数值计算及其计算机实现' },
        { id: 4, label: '自然语言处理导论' },
        { id: 5, label: '操作系统实践(进阶)' }
      ],
      edges: [
        { from: 1, to: 2 },
        { from: 2, to: 5 },
        { from: 4, to: 3 },
        { from: 5, to: 1 },
        { from: 1, to: 3 }
      ]
    }

    function init() {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000)
      camera.position.z = 250 // Increased camera distance for wider view

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      container.value.appendChild(renderer.domElement)

      labelRenderer = new CSS2DRenderer()
      labelRenderer.setSize(window.innerWidth, window.innerHeight)
      labelRenderer.domElement.style.position = 'absolute'
      labelRenderer.domElement.style.top = '30px'
      container.value.appendChild(labelRenderer.domElement)

      controls = new OrbitControls(camera, labelRenderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controls.minDistance = 10
      controls.maxDistance = 500

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const pointLight = new THREE.PointLight(0xffffff, 1)
      pointLight.position.set(10, 10, 10)
      scene.add(pointLight)

      createGraph()
      createStarfield()

      loading.value = false

      window.addEventListener('resize', onWindowResize)
    }

    function searchNode() {
      const query = searchQuery.value.trim()
      if (!query) return

      const targetIndex = courseData.nodes.findIndex(node => node.label.includes(query))
      if (targetIndex !== -1) {
        const targetSphere = nodes[targetIndex]
        if (targetSphere) {
          // 相机平滑飞过去
          const targetPosition = targetSphere.position.clone()
          const direction = targetPosition.clone().normalize()
          camera.position.copy(direction.multiplyScalar(250)) // 保持合适的距离
          controls.target.copy(targetPosition)
        }
      }
    }


    function createGraph() {
      const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
      const sphereMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00aaff,
        emissive: 0x0044aa,
        specular: 0xffffff,
        shininess: 100
      })

      const radius = 120 // Increased radius for a wider graph
      const phi = Math.PI * (3 - Math.sqrt(5)) // golden angle

      courseData.nodes.forEach((node, index) => {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        
        // Modified distribution algorithm
        const t = index / (courseData.nodes.length - 1)
        const inclination = Math.acos(1 - 2 * t)
        const azimuth = phi * index

        const x = radius * Math.sin(inclination) * Math.cos(azimuth)
        const y = radius * Math.sin(inclination) * Math.sin(azimuth)
        const z = radius * Math.cos(inclination)

        sphere.position.set(x, y, z)
        scene.add(sphere)
        nodes.push(sphere)

        const labelDiv = document.createElement('div')
        labelDiv.className = 'node-label'
        labelDiv.textContent = node.label
        const label = new CSS2DObject(labelDiv)
        label.position.copy(sphere.position)
        scene.add(label)
      })

      const edgeMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00ffff,
        transparent: true,
        opacity: 0.6
      })

      courseData.edges.forEach(edge => {
        const startNode = courseData.nodes.find(n => n.id === edge.from)
        const endNode = courseData.nodes.find(n => n.id === edge.to)
        
        if (startNode && endNode) {
          const start = nodes[courseData.nodes.indexOf(startNode)].position
          const end = nodes[courseData.nodes.indexOf(endNode)].position

          const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
          mid.add(new THREE.Vector3(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          ))

          const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
          const points = curve.getPoints(50)
          const geometry = new THREE.BufferGeometry().setFromPoints(points)
          // eslint-disable-next-line no-unused-vars
          const line = new THREE.Line(geometry, edgeMaterial)
          //scene.add(line)
          //edges.push(line)

          // Add arrow
          const dir = new THREE.Vector3().subVectors(end, start).normalize()
          //const arrowHelper = new THREE.ArrowHelper(dir, mid, 5, 0x00ffff, 1.5, 0.75)
          const arrowHelper = new THREE.ArrowHelper(dir, start, end.clone().sub(start).length()*0.99, 0x00ffff, 1, 1)

          
          scene.add(arrowHelper)
        }
      })
    }

    function createStarfield() {
      const starGeometry = new THREE.BufferGeometry()
      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true,
        opacity: 0.8
      })

      const starVertices = []
      for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 3000
        const y = (Math.random() - 0.5) * 3000
        const z = (Math.random() - 0.5) * 3000
        starVertices.push(x, y, z)
      }

      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))
      const stars = new THREE.Points(starGeometry, starMaterial)
      scene.add(stars)
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      labelRenderer.setSize(window.innerWidth, window.innerHeight)
    }

    function animate() {
      requestAnimationFrame(animate)

      nodes.forEach(node => {
        node.rotation.x += 0.005
        node.rotation.y += 0.005
      })

      edges.forEach(edge => {
        edge.material.opacity = (Math.sin(Date.now() * 0.001) + 1) * 0.3 + 0.3
      })

      controls.update()
      renderer.render(scene, camera)
      labelRenderer.render(scene, camera)
    }

    onMounted(() => {
      init()
      animate()
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onWindowResize)
      controls.dispose()
    })

    return { container, loading, searchQuery, searchNode }

  }
}
</script>

<style scoped>
.graph-container {
  width: 100vw;
  height: 100vh;
  background: #000000;
}

.overlay {
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: white;
  z-index: 10;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

.overlay h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.overlay p {
  font-size: 0.875rem;
  opacity: 0.7;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.25rem;
  text-align: center;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

:global(.node-label) {
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  pointer-events: none;
  white-space: nowrap;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}
</style>
