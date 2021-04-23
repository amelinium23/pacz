package repositories;

import java.util.ArrayList;
import java.util.List;

public abstract class Repository<T> {
    private final List<T> objects = new ArrayList<>();
    public void add(T obj) {
        objects.add(obj);
    }
    public int size() {
        return objects.size();
    }
    public boolean contains(T element) {
        return objects.contains(element);
    }
}
